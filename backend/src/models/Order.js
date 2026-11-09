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
      validate: {
        validator: Number.isFinite,
        message: "El precio unitario debe ser un importe válido.",
      },
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "La cantidad debe ser un número entero seguro.",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return (
            Number.isFinite(value) &&
            Number.isFinite(this.precioUnitario) &&
            Number.isSafeInteger(this.cantidad) &&
            Math.round(value * 100) ===
              Math.round(this.precioUnitario * this.cantidad * 100)
          );
        },
        message:
          "El subtotal debe coincidir con el precio unitario por la cantidad.",
      },
    },
  },
  {
    _id: false,
  },
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
      validate: {
        validator: Number.isFinite,
        message: "El total debe ser un importe numérico válido.",
      },
    },

    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "cancelado"],
      default: "confirmado",
    },
  },
  {
    timestamps: true,
  },
);

// Comprobar que el total coincida con la suma de los subtotales.
orderSchema.pre("validate", function () {
  if (!Array.isArray(this.items) || !Number.isFinite(this.total)) {
    return;
  }

  const sumaSubtotales = this.items.reduce(
    (acumulado, item) => acumulado + Math.round(item.subtotal * 100),
    0,
  );

  if (sumaSubtotales !== Math.round(this.total * 100)) {
    this.invalidate(
      "total",
      "El total del pedido debe coincidir con la suma de sus subtotales.",
    );
  }
});

module.exports = mongoose.model("Order", orderSchema);
