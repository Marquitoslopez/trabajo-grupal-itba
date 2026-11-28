const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");

// POST /api/pedidos

const crearPedido = async (req, res, next) => {
  try {
    const { items, datosEntrega } = req.body || {};

    // Validar datos de entrega.
    const camposEntrega = ["nombre", "email", "telefono", "direccion"];

    if (
      !datosEntrega ||
      typeof datosEntrega !== "object" ||
      Array.isArray(datosEntrega) ||
      camposEntrega.some(
        (campo) =>
          typeof datosEntrega[campo] !== "string" ||
          !datosEntrega[campo].trim(),
      )
    ) {
      return res.status(400).json({
        error: "Todos los datos de entrega son obligatorios.",
      });
    }

    const entrega = {
      nombre: datosEntrega.nombre.trim(),
      email: datosEntrega.email.trim().toLowerCase(),
      telefono: datosEntrega.telefono.trim(),
      direccion: datosEntrega.direccion.trim(),
    };

    if (
      entrega.nombre.length > 120 ||
      entrega.email.length > 254 ||
      entrega.telefono.length > 40 ||
      entrega.direccion.length > 300
    ) {
      return res.status(400).json({
        error: "Uno o más datos de entrega superan la longitud permitida.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entrega.email)) {
      return res.status(400).json({
        error: "El email ingresado no es válido.",
      });
    }

    // Validar el carrito.
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "El pedido debe contener al menos un producto.",
      });
    }

    if (items.length > 100) {
      return res.status(400).json({
        error: "El pedido no puede contener más de 100 líneas de productos.",
      });
    }

    // Validar y agrupar productos repetidos.
    const cantidades = new Map();

    for (const item of items) {
      const { productId, quantity } = item || {};

      if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).json({
          error: "Uno de los identificadores de producto no es válido.",
        });
      }

      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          error:
            "Las cantidades deben ser números enteros positivos y válidos.",
        });
      }

      const id = String(productId);
      cantidades.set(id, (cantidades.get(id) || 0) + quantity);

      if (!Number.isSafeInteger(cantidades.get(id))) {
        return res.status(400).json({
          error: "La cantidad total de un producto supera el límite permitido.",
        });
      }
    }

    const session = await mongoose.startSession();

    try {
      let pedidoCreado;

      await session.withTransaction(async () => {
        const productIds = [...cantidades.keys()];

        const productos = await Product.find({
          _id: { $in: productIds },
        }).session(session);

        if (productos.length !== productIds.length) {
          const error = new Error("Uno o más productos ya no existen.");
          error.statusCode = 404;
          throw error;
        }

        const productosMap = new Map(
          productos.map((producto) => [producto._id.toString(), producto]),
        );

        const itemsPedido = [];
        let totalCentavos = 0;

        // Calcular importes usando los precios reales de MongoDB.
        for (const [productId, cantidad] of cantidades) {
          const producto = productosMap.get(productId);

          if (producto.stock < cantidad) {
            const error = new Error(
              `Stock insuficiente para el producto "${producto.nombre}".`,
            );
            error.statusCode = 409;
            throw error;
          }

          const precioCentavos = Math.round(producto.precio * 100);
          const subtotalCentavos = precioCentavos * cantidad;

          if (
            !Number.isSafeInteger(subtotalCentavos) ||
            !Number.isSafeInteger(totalCentavos + subtotalCentavos)
          ) {
            const error = new Error(
              "El importe total del pedido supera el límite permitido.",
            );
            error.statusCode = 400;
            throw error;
          }

          totalCentavos += subtotalCentavos;

          itemsPedido.push({
            producto: producto._id,
            nombre: producto.nombre,
            precioUnitario: precioCentavos / 100,
            cantidad,
            subtotal: subtotalCentavos / 100,
          });
        }

        // Descontar stock de forma segura.
        for (const [productId, cantidad] of cantidades) {
          const resultado = await Product.updateOne(
            {
              _id: productId,
              stock: { $gte: cantidad },
            },
            {
              $inc: { stock: -cantidad },
            },
            { session },
          );

          if (resultado.modifiedCount !== 1) {
            const error = new Error(
              "El stock cambió mientras se procesaba la compra. Intentá nuevamente.",
            );
            error.statusCode = 409;
            throw error;
          }
        }

        // Crear pedido asociado al usuario autenticado.
        const [pedido] = await Order.create(
          [
            {
              usuario: req.user._id,
              datosEntrega: entrega,
              items: itemsPedido,
              total: totalCentavos / 100,
              estado: "pendiente",
            },
          ],
          { session },
        );

        pedidoCreado = pedido;
      });

      return res.status(201).json({
        mensaje: "Pedido registrado correctamente.",
        pedido: pedidoCreado,
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        error: error.message,
      });
    }

    next(error);
  }
};

// GET /api/pedidos/mis-pedidos
const obtenerMisPedidos = async (req, res, next) => {
  try {
    const pedidos = await Order.find({
      usuario: req.user._id,
    })
      .populate("items.producto", "nombre imagenUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      cantidad: pedidos.length,
      pedidos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearPedido,
  obtenerMisPedidos,
};
