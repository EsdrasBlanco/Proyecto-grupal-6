
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import type { CreateUserInput } from "../schemas/user.schema";

// Registrar un usuario
export const createUser = async (data: CreateUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      ecorreo: data.ecorreo,
    },
  });

  if (existingUser) {
    throw new Error("El correo electrónico ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      nombres: data.nombres,
      apellidos: data.apellidos,
      ecorreo: data.ecorreo,
      password: hashedPassword,
      telefono: data.telefono,
    },
    select: {
      id: true,
      nombres: true,
      apellidos: true,
      ecorreo: true,
      telefono: true,
      rol: true,
      activo: true,
      createdAt: true,
    },
  });

  return newUser;
};

// Consultar todos los usuarios
export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nombres: true,
      apellidos: true,
      ecorreo: true,
      telefono: true,
      rol: true,
      activo: true,
      createdAt: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return users;
};
