import bcrypt from "bcrypt";
import { storage } from "./storage";

export async function registerUser(req, res) {
  const { email, password, name } = req.body;

  const existing = await storage.getUserByEmail(email);

  if (existing) {
    return res.status(400).json({
      message: "Email já existe"
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await storage.createUser({
    email,
    password: hashed,
    name
  });

  req.session.userId = user.id;

  res.json({
    id: user.id,
    email: user.email
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await storage.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Credenciais inválidas"
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({
      message: "Credenciais inválidas"
    });
  }

  req.session.userId = user.id;

  res.json({
    id: user.id,
    email: user.email
  });
}

export async function getCurrentUser(req, res) {

  if (!req.session.userId) {
    return res.status(401).json({
      message: "Not logged"
    });
  }

  const user = await storage.getUser(req.session.userId);

  res.json(user);
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
}