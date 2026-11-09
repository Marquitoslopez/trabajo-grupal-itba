const express = require("express");
const cors = require("cors");

const productosRouter = require("./routes/productos.routes");
const authRouter = require("./routes/auth.routes");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const pedidosRouter = require("./routes/pedidos.routes");

const app = express();

// Middlewares generales
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "http://localhost:5173" }));
app.use(logger);
app.use(express.json());

// Rutas
app.use("/api/productos", productosRouter);
app.use("/api/auth", authRouter);
app.use("/api/pedidos", pedidosRouter);

// 404 general
app.use(notFound);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;