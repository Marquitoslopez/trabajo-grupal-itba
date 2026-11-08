const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verificarToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Debés iniciar sesión para realizar esta acción." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id nombre email");

    if (!user) return res.status(401).json({ error: "La sesión ya no es válida." });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o sesión vencida." });
  }
};

module.exports = verificarToken;
