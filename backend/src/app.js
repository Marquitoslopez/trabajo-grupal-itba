const express = require("express");
const cors = require("cors");

const productosRouter = require("./routes/productos.routes");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares generales
app.use(cors({ origin: "http://localhost:5173" }));
app.use(logger);
app.use(express.json());

// Rutas
app.use("/api/productos", productosRouter);

// 404 general
app.use(notFound);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;