import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";

const matriculaRouter = Router();

matriculaRouter.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: {
        estudiante: {
          include: {
            user: {
              select: { id: true, nombres: true, apellidos: true, ecorreo: true },
            },
          },
        },
        curso: true,
      },
      orderBy: { id: "asc" },
    });
    res.status(200).json(matriculas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las matrículas",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default matriculaRouter;
