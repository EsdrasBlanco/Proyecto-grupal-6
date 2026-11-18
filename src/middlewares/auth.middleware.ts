import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type RoleType = "ESTUDIANTE" | "DOCENTE" | "DIRECTOR";

export interface AuthPayload {
  id: number;
  ecorreo: string;
  rol: RoleType;
  estudianteId?: number | null;
  docenteId?: number | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "No autenticado. Se requiere un token Bearer en el encabezado Authorization.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "proyecto-6ta-semana";

  try {
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      message: "Token inválido o expirado.",
    });
  }
};

export const authorizeRoles = (...allowedRoles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: "No autenticado.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.rol)) {
      res.status(403).json({
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${allowedRoles.join(", ")}`,
      });
      return;
    }

    next();
  };
};
