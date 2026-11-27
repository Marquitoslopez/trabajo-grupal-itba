const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    nombreProducto: {
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
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    cliente: {
      nombre: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      telefono: { type: String, required: true, trim: true },
      direccion: { type: String, required: true, trim: true },
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "El pedido debe tener al menos un producto",
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
      default: "pendiente",
    },
    tokenClienteHash: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

orderSchema.index({ tokenClienteHash: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
