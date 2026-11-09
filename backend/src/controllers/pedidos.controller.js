const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");

// POST /api/pedidos
const crearPedido = async (req, res, next) => {
  const { items } = req.body;

  try {
    // Validación inicial del carrito.
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "El pedido debe contener al menos un producto.",
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

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          error: "Las cantidades deben ser números enteros mayores a cero.",
        });
      }

      const id = String(productId);
      cantidades.set(id, (cantidades.get(id) || 0) + quantity);
    }

    const session = await mongoose.startSession();

    try {
      let pedidoCreado;

      await session.withTransaction(async () => {
        const productIds = [...cantidades.keys()];

        // Consultar los productos reales en la base de datos.
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

        // Comprobar stock y calcular importes desde MongoDB.
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

          totalCentavos += subtotalCentavos;

          itemsPedido.push({
            producto: producto._id,
            nombre: producto.nombre,
            precioUnitario: producto.precio,
            cantidad,
            subtotal: subtotalCentavos / 100,
          });
        }

        // Descontar stock con una condición para evitar
        // vender unidades que ya no están disponibles.
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

        // Registrar el pedido asociado al usuario del JWT.
        const [pedido] = await Order.create(
          [
            {
              usuario: req.user._id,
              items: itemsPedido,
              total: totalCentavos / 100,
              estado: "confirmado",
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
