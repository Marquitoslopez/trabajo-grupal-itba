const express = require("express");
const productosRouter = require("./routes/productos.routes");

const app = express();

app.use(express.json());

app.use("/api/productos", productosRouter);

module.exports = app;