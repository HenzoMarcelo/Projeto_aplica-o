import { pool } from "../db.js";

export async function findAllPosts() {
  const result = await pool.query(`
    SELECT p.id, p.author_id, p.title, p.description,
           p.image, p.created_at, p.updated_at, u.username
    FROM posts p
    JOIN users u ON u.id = p.author_id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
}

export async function findPostById(id: number) {
  const result = await pool.query(
    `SELECT id, author_id, title, description, image, created_at, updated_at
     FROM posts
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function insertPost(
  authorId: number,
  title: string,
  description: string | null,
  image: string | null
) {
  const result = await pool.query(
    `INSERT INTO posts (author_id, title, description, image)
     VALUES ($1, $2, $3, $4)
     RETURNING id, author_id, title, description, image, created_at, updated_at`,
    [authorId, title, description, image]
  );

  return result.rows[0];
}

export async function updatePostById(
  id: number,
  authorId: number,
  title: string | undefined,
  description: string | null | undefined,
  image: string | null | undefined
) {
  const result = await pool.query(
    `UPDATE posts
     SET title = COALESCE($1, title),
         description = CASE WHEN $2 THEN $3 ELSE description END,
         image = CASE WHEN $4 THEN $5 ELSE image END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6 AND author_id = $7
     RETURNING id, author_id, title, description, image, created_at, updated_at`,
    [
      title === undefined ? null : title,
      description !== undefined,
      description ?? null,
      image !== undefined,
      image ?? null,
      id,
      authorId,
    ]
  );

  return result.rows[0] ?? null;
}

export async function deletePostById(id: number, authorId: number) {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING id",
    [id, authorId]
  );

  return result.rows.length > 0;
}

