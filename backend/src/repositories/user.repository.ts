import { pool } from "../db.js";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const result = await pool.query<User>(
    `SELECT id, username, email, password
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function createUser(
  username: string,
  email: string,
  passwordHash: string
): Promise<Omit<User, "password">> {
  const result = await pool.query<User>(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, passwordHash]
  );

  return result.rows[0];
}