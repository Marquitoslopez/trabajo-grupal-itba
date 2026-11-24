const verificarAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Debés iniciar sesión para realizar esta acción.",
    });
  }

  if (req.user.rol !== "admin") {
    return res.status(403).json({
      error: "No tenés permisos para realizar esta acción.",
    });
  }

  next();
};

module.exports = verificarAdmin;
