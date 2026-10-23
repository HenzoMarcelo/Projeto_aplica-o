import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import * as postService from "../services/post.service.js";

export async function listPosts(
  _req: AuthenticatedRequest,
  res: Response
) {
  try {
    const posts = await postService.listPosts();
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar publicações." });
  }
}

export async function getPost(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const post = await postService.getPost(id);

    if (!post) {
      return res.status(404).json({ error: "Publicação não encontrada." });
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar publicação." });
  }
}

export async function createPost(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { title, description, image } = req.body;
    const authorId = Number(req.user?.sub);

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "O título é obrigatório." });
    }

    if (
      (description !== undefined && description !== null && typeof description !== "string") ||
      (image !== undefined && image !== null && typeof image !== "string")
    ) {
      return res.status(400).json({ error: "Descrição ou imagem inválida." });
    }

    const post = await postService.createPost(
      authorId,
      title.trim(),
      description ?? null,
      image ?? null
    );

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar publicação." });
  }
}

export async function updatePost(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const authorId = Number(req.user?.sub);
    const { title, description, image } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido." });
    }

    if (
      (title !== undefined && (typeof title !== "string" || !title.trim())) ||
      (description !== undefined && description !== null && typeof description !== "string") ||
      (image !== undefined && image !== null && typeof image !== "string")
    ) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    if (title === undefined && description === undefined && image === undefined) {
      return res.status(400).json({
        error: "Informe pelo menos um campo para atualizar.",
      });
    }

    const post = await postService.updatePost(
      id,
      authorId,
      title === undefined ? undefined : title.trim(),
      description,
      image
    );

    if (!post) {
      return res.status(404).json({
        error: "Publicação não encontrada ou você não é o autor.",
      });
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar publicação." });
  }
}

export async function deletePost(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const authorId = Number(req.user?.sub);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const deleted = await postService.deletePost(id, authorId);

    if (!deleted) {
      return res.status(404).json({
        error: "Publicação não encontrada ou você não é o autor.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir publicação." });
  }
}

