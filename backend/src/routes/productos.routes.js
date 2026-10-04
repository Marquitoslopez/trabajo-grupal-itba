const express = require("express");

const {
  obtenerProductos,
  obtenerProductoPorId,
} = require("../controllers/productos.controller");

const router = express.Router();

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

module.exports = router;