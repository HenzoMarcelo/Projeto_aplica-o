import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: number;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("A variável JWT_SECRET não foi configurada.");
  }

  return secret;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token de autenticação não fornecido.",
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (
      typeof payload === "string" ||
      typeof payload.sub !== "string" ||
      !payload.username
    ) {
      return res.status(401).json({
        error: "Token inválido.",
      });
    }

    req.user = {
      sub: Number(payload.sub),
      username: payload.username as string,
    };

    return next();
  } catch {
    return res.status(401).json({
      error: "Token inválido ou expirado.",
    });
  }
}

