
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  // Error de validación de Mongoose.
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Los datos enviados no son válidos.",
    });
  }

  // Error de identificador inválido de MongoDB.
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "El identificador proporcionado no es válido.",
    });
  }

  // Error por duplicación de un valor único.
  if (err.code === 11000) {
    return res.status(409).json({
      error: "Ya existe un registro con esos datos.",
    });
  }

  return res.status(500).json({
    error: "Error interno del servidor.",
  });
};

module.exports = errorHandler;
