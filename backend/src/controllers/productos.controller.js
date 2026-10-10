
const mongoose = require("mongoose");
const Product = require("../models/Product");

// GET /api/productos
const obtenerProductos = async (req, res, next) => {
  try {
    const productos = await Product.find();

    res.json(productos);
  } catch (error) {
    next(error);
  }
};

// GET /api/productos/:id
const obtenerProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "ID de producto inválido",
      });
    }

    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// POST /api/productos
const crearProducto = async (req, res, next) => {
  try {
    const producto = await Product.create(req.body);

    res.status(201).json(producto);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        error: "Datos del producto inválidos",
        detalles: error.message,
      });
    }

    next(error);
  }
};

// PUT /api/productos/:id
const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "ID de producto inválido",
      });
    }

    const producto = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        error: "Datos del producto inválidos",
        detalles: error.message,
      });
    }

    next(error);
  }
};

// DELETE /api/productos/:id
const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "ID de producto inválido",
      });
    }

    const producto = await Product.findByIdAndDelete(id);

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      mensaje: "Producto eliminado correctamente",
      producto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};