require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("Falta configurar MONGODB_URI en backend/.env");
    process.exit(1);
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET debe estar configurado y tener al menos 32 caracteres.");
    process.exit(1);
  }
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
};

startServer();