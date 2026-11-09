const express = require("express");

const {
  crearPedido,
  obtenerMisPedidos,
} = require("../controllers/pedidos.controller");

const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Todas las rutas de pedidos requieren autenticación.
router.use(verificarToken);

// Registrar un nuevo pedido.
router.post("/", crearPedido);

// Obtener los pedidos del usuario autenticado.
router.get("/mis-pedidos", obtenerMisPedidos);

module.exports = router;