import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getCursos = async (req: Request, res: Response) => {
  try {
    const cursos = await prisma.curso.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: cursos });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los cursos",
      details: error.message,
    });
  }
};

export const createCurso = async (req: Request, res: Response) => {
  const { nombreCurso, descripcion, duracionHoras, horario, docenteId, aulaId } = req.body;
  try {
    const newCurso = await prisma.curso.create({
      data: {
        nombreCurso,
        descripcion,
        duracionHoras,
        horario,
        docenteId,
        aulaId,
      },
    });
    res.status(201).json({
      status: "ok",
      data: newCurso,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el curso",
      details: error.message,
    });
  }
};
