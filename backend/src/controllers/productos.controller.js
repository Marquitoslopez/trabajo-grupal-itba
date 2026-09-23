const productos = require("../data/productos");

const obtenerProductos = (req, res) => {
  res.json(productos);
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;

  const producto = productos.find((producto) => producto.id === id);

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