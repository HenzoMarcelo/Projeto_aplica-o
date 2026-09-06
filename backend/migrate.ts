import { Client } from "pg";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function migrate() {
    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    const migrationsPath = path.join(process.cwd(), "migrations");

    const files = fs
        .readdirSync(migrationsPath)
        .filter(file => file.endsWith(".sql"))
        .sort();

    for (const file of files) {
        const filePath = path.join(migrationsPath, file);
        const sql = fs.readFileSync(filePath, "utf-8");

        console.log(`Executando: ${file}`);

        const result = await client.query(
            "SELECT name FROM migrations WHERE name = $1",
            [file]
        );

        if (result.rowCount && result.rowCount > 0)  {
            console.log(`Pulando ${file} (já executada).`);
            continue;
        }

        await client.query(sql);

        await client.query(
            "INSERT INTO migrations (name) VALUES ($1)",
            [file]
        );

        console.log(sql);
    }

    console.log("Conectado ao PostgreSQL!");
}

migrate();
