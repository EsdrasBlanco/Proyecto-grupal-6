// src/services/matricula.service.ts)
import { prisma } from "../config/prisma";

type EstadoMatricula =
  | "INSCRITO"
  | "APROBADO"
  | "REPROBADO"
  | "RETIRADO";

interface CreateMatriculaInput {
  estudianteId: number;
  cursoId: number;
}

interface UpdateMatriculaInput {
  calificacionFinal?: number;
  estado?: EstadoMatricula;
}

export const getAllMatriculas = async () => {
  return await prisma.matricula.findMany({
    include: {
      estudiante: {
        include: {
          user: {
            select: {
              nombres: true,
              apellidos: true,
              ecorreo: true,
            },
          },
        },
      },
      curso: {
        select: {
          nombreCurso: true,
          horario: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const getMatriculaById = async (id: number) => {
  const matricula = await prisma.matricula.findUnique({
    where: { id },
    include: {
      estudiante: {
        include: {
          user: {
            select: {
              nombres: true,
              apellidos: true,
              ecorreo: true,
            },
          },
        },
      },
      curso: true,
    },
  });

  if (!matricula) {
    throw new Error("Matrícula no encontrada");
  }

  return matricula;
};

export const createMatricula = async (data: CreateMatriculaInput) => {
  const { estudianteId, cursoId } = data;

  const [estudiante, curso] = await Promise.all([
    prisma.estudiante.findUnique({ where: { id: estudianteId } }),
    prisma.curso.findUnique({
      where: { id: cursoId },
      include: { aula: true },
    }),
  ]);

  if (!estudiante) {
    throw new Error("El estudiante no existe");
  }

  if (!curso) {
    throw new Error("El curso no existe");
  }

  const yaMatriculado = await prisma.matricula.findUnique({
    where: {
      estudianteId_cursoId: { estudianteId, cursoId },
    },
  });

  if (yaMatriculado) {
    throw new Error("El estudiante ya se encuentra matriculado en este curso");
  }

  const inscritos = await prisma.matricula.count({
    where: { cursoId, estado: "INSCRITO" },
  });

  if (inscritos >= curso.aula.capacidad) {
    throw new Error("El curso ya alcanzó la capacidad máxima del aula");
  }

  return await prisma.matricula.create({
    data: {
      estudianteId,
      cursoId,
    },
  });
};

export const updateMatricula = async (
  id: number,
  data: UpdateMatriculaInput
) => {
  const existe = await prisma.matricula.findUnique({ where: { id } });

  if (!existe) {
    throw new Error("Matrícula no encontrada");
  }

  return await prisma.matricula.update({
    where: { id },
    data: {
      ...(data.calificacionFinal !== undefined && {
        calificacionFinal: data.calificacionFinal,
      }),
      ...(data.estado && { estado: data.estado }),
    },
  });
};

export const deleteMatricula = async (id: number) => {
  const existe = await prisma.matricula.findUnique({ where: { id } });

  if (!existe) {
    throw new Error("Matrícula no encontrada");
  }

  return await prisma.matricula.delete({
    where: { id },
  });
};
