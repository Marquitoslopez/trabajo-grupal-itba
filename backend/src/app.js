const express = require("express");
const cors = require("cors");

const productosRouter = require("./routes/productos.routes");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares generales
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Origen no permitido por CORS"));
  },
}));
app.use(logger);
app.use(express.json());

// Rutas
app.use("/api/productos", productosRouter);

// 404 general
app.use(notFound);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;