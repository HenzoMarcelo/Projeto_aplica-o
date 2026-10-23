import express from "express";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


app.get("/", (_req, res) => {
  res.json({
    message: "API do Prisma funcionando!",
  });
});


app.get("/health", async (_req, res) => {
  try {
    const resultado = await pool.query("SELECT NOW()");

    res.json({
      status: "ok",
      database: "connected",
      time: resultado.rows[0].now,
    });
  } catch (erro) {
    console.error("Erro ao consultar o PostgreSQL:", erro);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API do Prisma disponível na porta ${PORT}`);
});

