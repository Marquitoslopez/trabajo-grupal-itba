
const express = require("express");

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");

const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", verificarToken, crearProducto);
router.put("/:id", verificarToken, actualizarProducto);
router.delete("/:id", verificarToken, eliminarProducto);

module.exports = router;