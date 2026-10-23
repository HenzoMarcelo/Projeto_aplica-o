
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("A variável JWT_SECRET não foi configurada.");
  }

  return secret;
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  if (!username.trim() || !email.trim() || !password) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  if (password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return createUser(username.trim(), email.trim(), passwordHash);
}

export async function login(email: string, password: string) {
  if (!email.trim() || !password) {
    throw new Error("Informe o e-mail e a senha.");
  }

  const user = await findUserByEmail(email.trim());

  if (!user) {
    throw new Error("E-mail ou senha incorretos.");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new Error("E-mail ou senha incorretos.");
  }

  const token = jwt.sign(
  { sub: String(user.id), username: user.username },
  getJwtSecret(),
  { expiresIn: "1h" }
);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
}

