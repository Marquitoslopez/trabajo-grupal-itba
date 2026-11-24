const express = require("express");

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");

const verificarToken = require("../middlewares/auth.middleware");
const verificarAdmin = require("../middlewares/admin.middleware");

const router = express.Router();

// Rutas públicas.
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

// Rutas exclusivas para administradores.
router.post("/", verificarToken, verificarAdmin, crearProducto);
router.put("/:id", verificarToken, verificarAdmin, actualizarProducto);
router.delete("/:id", verificarToken, verificarAdmin, eliminarProducto);

module.exports = router;
