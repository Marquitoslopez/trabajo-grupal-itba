
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verificarToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        error: "Debés iniciar sesión para realizar esta acción.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return next(new Error("JWT_SECRET no está configurado."));
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError" ||
        error.name === "NotBeforeError"
      ) {
        return res.status(401).json({
          error: "Token inválido o sesión vencida.",
        });
      }

      return next(error);
    }

    const user = await User.findById(decoded.id).select("_id nombre email");

    if (!user) {
      return res.status(401).json({
        error: "La sesión ya no es válida.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verificarToken;
