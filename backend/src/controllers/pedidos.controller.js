const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token.toLowerCase()).digest("hex");

const obtenerTokenCliente = (req) => {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer ([a-f\d]{64})$/i);
  return match?.[1] || "";
};

const crearPedido = async (req, res, next) => {
  try {
    const { cliente, items, tokenCliente } = req.body || {};

    if (
      !cliente ||
      typeof cliente.nombre !== "string" ||
      !cliente.nombre.trim() ||
      cliente.nombre.trim().length > 120 ||
      typeof cliente.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email.trim()) ||
      cliente.email.trim().length > 254 ||
      typeof cliente.telefono !== "string" ||
      !cliente.telefono.trim() ||
      cliente.telefono.trim().length > 40 ||
      typeof cliente.direccion !== "string" ||
      !cliente.direccion.trim() ||
      cliente.direccion.trim().length > 300
    ) {
      return res.status(400).json({
        error: "Completá nombre, email, teléfono y dirección de entrega válidos.",
      });
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return res.status(400).json({
        error: "El pedido debe incluir entre 1 y 50 productos.",
      });
    }

    if (!/^[a-f\d]{64}$/i.test(tokenCliente || "")) {
      return res.status(400).json({
        error: "Token de cliente inválido.",
      });
    }

    const quantities = new Map();
    for (const item of items) {
      if (
        !item ||
        !mongoose.isValidObjectId(item.productoId) ||
        !Number.isSafeInteger(item.cantidad) ||
        item.cantidad < 1
      ) {
        return res.status(400).json({
          error: "Los productos o cantidades del pedido son inválidos.",
        });
      }

      const productId = String(item.productoId);
      const quantity = (quantities.get(productId) || 0) + item.cantidad;
      if (!Number.isSafeInteger(quantity)) {
        return res.status(400).json({
          error: "La cantidad solicitada supera el límite permitido.",
        });
      }

      quantities.set(productId, quantity);
    }

    const products = await Product.find({
      _id: { $in: [...quantities.keys()] },
    });
    const productsById = new Map(
      products.map((product) => [String(product._id), product]),
    );

    if (productsById.size !== quantities.size) {
      return res.status(400).json({
        error: "Uno o más productos ya no están disponibles.",
      });
    }

    const orderItems = [...quantities].map(([productId, cantidad]) => {
      const product = productsById.get(productId);
      const precioUnitario = product.precio;

      return {
        producto: product._id,
        nombreProducto: product.nombre,
        precioUnitario,
        cantidad,
        subtotal: precioUnitario * cantidad,
      };
    });
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    const pedido = await Order.create({
      cliente: {
        nombre: cliente.nombre.trim(),
        email: cliente.email.trim(),
        telefono: cliente.telefono.trim(),
        direccion: cliente.direccion.trim(),
      },
      items: orderItems,
      total,
      estado: "pendiente",
      tokenClienteHash: hashToken(tokenCliente),
    });

    res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
};

const obtenerMisPedidos = async (req, res, next) => {
  try {
    const tokenCliente = obtenerTokenCliente(req);

    if (!tokenCliente) {
      return res.status(401).json({
        error: "Se necesita un token de cliente válido para consultar los pedidos.",
      });
    }

    const pedidos = await Order.find({
      tokenClienteHash: hashToken(tokenCliente),
    }).sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

module.exports = { crearPedido, obtenerMisPedidos };
