
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    precioUnitario: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "La cantidad debe ser un número entero.",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "El pedido debe contener al menos un producto.",
      },
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "cancelado"],
      default: "confirmado",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
