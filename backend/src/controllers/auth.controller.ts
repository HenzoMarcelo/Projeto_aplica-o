
import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor.";

    if (message === "Este e-mail já está cadastrado.") {
      return res.status(409).json({ error: message });
    }

    if (
      message === "Preencha todos os campos obrigatórios." ||
      message === "A senha deve ter pelo menos 8 caracteres."
    ) {
      return res.status(400).json({ error: message });
    }

    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor.";

    if (message === "E-mail ou senha incorretos.") {
      return res.status(401).json({ error: message });
    }

    if (message === "Informe o e-mail e a senha.") {
      return res.status(400).json({ error: message });
    }

    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}


import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export function profile(req: AuthenticatedRequest, res: Response) {
  return res.status(200).json({
    message: "Autenticação realizada com sucesso!",
    user: req.user,
  });
}

