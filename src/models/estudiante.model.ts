import { prisma } from "../config/prisma";

export async function getAllEstudiantesModel() {
  return await prisma.estudiante.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getEstudianteByIdModel(id: number) {
  return await prisma.estudiante.findUnique({
    where: { id },
    include: {
      cursos: true,
    },
  });
}

export async function getEstudianteByNameModel(nombreEstudiante: string) {
  return await prisma.estudiante.findUnique({
    where: { nombreEstudiante },
  });
}

export async function createEstudianteModel(data: {
  nombreEstudiante: string;
  edad: number;
  grado: string;
}) {
  return await prisma.estudiante.create({
    data,
  });
}

export async function updateEstudianteModel(
  id: number,
  data: {
    nombreEstudiante?: string;
    edad?: number;
    grado?: string;
  }
) {
  return await prisma.estudiante.update({
    where: { id },
    data,
  });
}

export async function deleteEstudianteModel(id: number) {
  return await prisma.estudiante.delete({
    where: { id },
  });
}
