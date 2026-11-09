const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },

    descripcion: {
      type: String,
      trim: true,
      default: "",
    },

    precio: {
      type: Number,
      required: [true, "El precio del producto es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      validate: {
        validator: Number.isFinite,
        message: "El precio debe ser un número válido.",
      },
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
      validate: {
        validator: Number.isSafeInteger,
        message: "El stock debe ser un número entero positivo y válido.",
      },
    },

    imagenUrl: {
      type: String,
      trim: true,
      default: "",
    },

    categorias: {
      type: String,
      trim: true,
      default: "casa",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
