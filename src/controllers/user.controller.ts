
import type { Request, Response } from "express";
import { createUser, getUsers } from "../services/user.service";

// POST /users
export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "El correo electrónico ya está registrado"
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

    console.error("Error al crear usuario:", error);

    return res.status(500).json({
      message: "Error interno al crear el usuario",
    });
  }
};

// GET /users
export const getUsersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      message: "Usuarios obtenidos correctamente",
      data: users,
    });
  } catch (error) {
    console.error("Error al consultar usuarios:", error);

    return res.status(500).json({
      message: "Error interno al consultar los usuarios",
    });
  }
};
