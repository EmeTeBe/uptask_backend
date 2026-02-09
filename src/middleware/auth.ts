import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("_id name email");

      if (user) {
        req.user = user;
      } else {
        return res.status(401).json({ error: "Usuario no existe" });
      }

      return next();
    } else {
      res.status(500).json({ error: "JWT no válido" });
    }
  } catch (error) {
    console.error("Error en autenticación:", error);

    // Manejar diferentes tipos de errores de JWT
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Token inválido" });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }

    return res.status(500).json({ error: "Error en autenticación" });
  }
};
