const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const crearToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registrar = async (req, res, next) => {
  try {
    const nombre = String(req.body.nombre || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, correo y contraseña son obligatorios." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Ingresá un correo electrónico válido." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
    }
    const existente = await User.findOne({ email });
    if (existente) return res.status(409).json({ error: "Ya existe una cuenta con ese correo." });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ nombre, email, password: passwordHash });
    const token = crearToken(user);

    return res.status(201).json({
      token,
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: "Ese correo ya está registrado." });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!email || !password) return res.status(400).json({ error: "Ingresá correo y contraseña." });

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }

    return res.json({
      token: crearToken(user),
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const perfilActual = (req, res) => {
  res.json({ user: { id: req.user._id, nombre: req.user.nombre, email: req.user.email } });
};

module.exports = { registrar, login, perfilActual };
