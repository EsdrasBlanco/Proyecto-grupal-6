import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getAulas = async (req: Request, res: Response) => {
  try {
    const aulas = await prisma.aula.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: aulas });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener las aulas",
      details: error.message,
    });
  }
};

export const createAula = async (req: Request, res: Response) => {
  const { nombreAula, capacidad, ubicacion } = req.body;
  try {
    const newAula = await prisma.aula.create({
      data: {
        nombreAula,
        capacidad,
        ubicacion,
      },
    });
    res.status(201).json({
      status: "ok",
      data: newAula,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el aula",
      details: error.message,
    });
  }
};
