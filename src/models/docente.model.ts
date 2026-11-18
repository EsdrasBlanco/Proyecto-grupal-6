import { prisma } from "../config/prisma";

export async function getAllDocentes() {
  return await prisma.docente.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getDocenteById(id: number) {
  return await prisma.docente.findUnique({
    where: { id },
    include: {
      cursos: true,
    },
  });
}

export async function getDocenteByName(nombreDocente: string) {
  return await prisma.docente.findUnique({
    where: { nombreDocente },
  });
}

export async function createDocenteModel(data: {
  nombreDocente: string;
  especialidad: string;
  añosExperiencia: number;
}) {
  return await prisma.docente.create({
    data,
  });
}

export async function updateDocenteModel(
  id: number,
  data: {
    nombreDocente?: string;
    especialidad?: string;
    añosExperiencia?: number;
  }
) {
  return await prisma.docente.update({
    where: { id },
    data,
  });
}

export async function deleteDocenteModel(id: number) {
  return await prisma.docente.delete({
    where: { id },
  });
}
