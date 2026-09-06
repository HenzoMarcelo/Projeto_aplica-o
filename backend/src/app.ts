import { pool } from "./db.js";

async function testarBanco() {
  try {
    const resultado = await pool.query("SELECT NOW()");
    console.log("Conexão com PostgreSQL funcionando!");
    console.log("Horário do banco:", resultado.rows[0].now);
  } catch (erro) {
    console.error("Erro ao conectar com PostgreSQL:", erro);
  } finally {
    await pool.end();
  }
}

testarBanco();