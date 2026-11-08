const express = require("express");
const { registrar, login, perfilActual } = require("../controllers/auth.controller");
const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/registro", registrar);
router.post("/login", login);
router.get("/me", verificarToken, perfilActual);

module.exports = router;
