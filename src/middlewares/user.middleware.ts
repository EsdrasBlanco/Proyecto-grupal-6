
import type { Request, Response, NextFunction } from "express";
import { createUserSchema } from "../schemas/user.schema";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Error de validación",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = result.data;

  next();
};
