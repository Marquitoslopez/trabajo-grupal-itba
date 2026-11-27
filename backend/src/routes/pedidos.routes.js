const express = require("express");
const {
  crearPedido,
  obtenerMisPedidos,
} = require("../controllers/pedidos.controller");

const router = express.Router();

router.post("/", crearPedido);
router.get("/mis-pedidos", obtenerMisPedidos);

module.exports = router;
