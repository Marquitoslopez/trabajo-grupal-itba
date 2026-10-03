const { getProductos, getProductoById } = require("../data/productos");

const obtenerProductos = (req, res) => {
  res.json(getProductos());
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;

  const producto = getProductoById(id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  res.json(producto);
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
};