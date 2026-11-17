// prisma/seed.ts
import { prisma } from "../src/config/prisma";

async function main() {
  // 1. Crear 1 usuario Director
  const director = await prisma.user.create({
    data: {
      nombres: "Carlos",
      apellidos: "Mendoza",
      ecorreo: "director@academia.edu",
      password: "hashed_password_123",
      telefono: "987654321",
      rol: "DIRECTOR",
    },
  });

  // 2. Crear 4 Docentes con su respectivo User
  const docente1 = await prisma.docente.create({
    data: {
      especialidad: "Backend & Node.js",
      user: {
        create: {
          nombres: "Laura",
          apellidos: "Gómez",
          ecorreo: "laura@academia.edu",
          password: "hashed_password_123",
          rol: "DOCENTE",
        },
      },
    },
  });

  const docente2 = await prisma.docente.create({
    data: {
      especialidad: "Bases de Datos SQL",
      user: {
        create: {
          nombres: "Roberto",
          apellidos: "Silva",
          ecorreo: "roberto@academia.edu",
          password: "hashed_password_123",
          rol: "DOCENTE",
        },
      },
    },
  });

  const docente3 = await prisma.docente.create({
    data: {
      especialidad: "Diseño UX/UI",
      user: {
        create: {
          nombres: "Elena",
          apellidos: "Rojas",
          ecorreo: "elena@academia.edu",
          password: "hashed_password_123",
          rol: "DOCENTE",
        },
      },
    },
  });

  const docente4 = await prisma.docente.create({
    data: {
      especialidad: "Python e IA",
      user: {
        create: {
          nombres: "Marcos",
          apellidos: "Castro",
          ecorreo: "marcos@academia.edu",
          password: "hashed_password_123",
          rol: "DOCENTE",
        },
      },
    },
  });

  // 3. Crear 4 Estudiantes con su respectivo User
  const estudiante1 = await prisma.estudiante.create({
    data: {
      documentoIdentidad: "71234561",
      fechaNacimiento: new Date("2002-05-14"),
      user: {
        create: {
          nombres: "Ana",
          apellidos: "Torres",
          ecorreo: "ana@academia.edu",
          password: "hashed_password_123",
          rol: "ESTUDIANTE",
        },
      },
    },
  });

  const estudiante2 = await prisma.estudiante.create({
    data: {
      documentoIdentidad: "71234562",
      fechaNacimiento: new Date("2001-09-22"),
      user: {
        create: {
          nombres: "Luis",
          apellidos: "Pérez",
          ecorreo: "luis@academia.edu",
          password: "hashed_password_123",
          rol: "ESTUDIANTE",
        },
      },
    },
  });

  const estudiante3 = await prisma.estudiante.create({
    data: {
      documentoIdentidad: "71234563",
      fechaNacimiento: new Date("2003-01-10"),
      user: {
        create: {
          nombres: "Sofía",
          apellidos: "Ramírez",
          ecorreo: "sofia@academia.edu",
          password: "hashed_password_123",
          rol: "ESTUDIANTE",
        },
      },
    },
  });

  const estudiante4 = await prisma.estudiante.create({
    data: {
      documentoIdentidad: "71234564",
      fechaNacimiento: new Date("2000-11-30"),
      user: {
        create: {
          nombres: "Diego",
          apellidos: "Vargas",
          ecorreo: "diego@academia.edu",
          password: "hashed_password_123",
          rol: "ESTUDIANTE",
        },
      },
    },
  });

  // 4. Crear 4 Aulas
  const aula1 = await prisma.aula.create({
    data: { nombreAula: "Aula 101", capacidad: 30, ubicacion: "Piso 1" },
  });
  const aula2 = await prisma.aula.create({
    data: { nombreAula: "Lab Cómputo 1", capacidad: 20, ubicacion: "Piso 2" },
  });
  const aula3 = await prisma.aula.create({
    data: { nombreAula: "Lab Cómputo 2", capacidad: 20, ubicacion: "Piso 2" },
  });
  const aula4 = await prisma.aula.create({
    data: { nombreAula: "Sala Virtual 1", capacidad: 50, ubicacion: "Online" },
  });

  // 5. Crear 4 Cursos
  const curso1 = await prisma.curso.create({
    data: {
      nombreCurso: "Backend con Node.js y Prisma",
      descripcion: "APIs REST con TypeScript",
      duracionHoras: 48,
      horario: "Lun y Mié 18:00 - 21:00",
      docenteId: docente1.id,
      aulaId: aula2.id,
    },
  });

  const curso2 = await prisma.curso.create({
    data: {
      nombreCurso: "PostgreSQL Avanzado",
      descripcion: "Normalización y consultas complejas",
      duracionHoras: 36,
      horario: "Mar y Jue 18:00 - 21:00",
      docenteId: docente2.id,
      aulaId: aula3.id,
    },
  });

  const curso3 = await prisma.curso.create({
    data: {
      nombreCurso: "Diseño UX/UI",
      descripcion: "Prototipado en Figma",
      duracionHoras: 24,
      horario: "Sáb 09:00 - 13:00",
      docenteId: docente3.id,
      aulaId: aula1.id,
    },
  });

  const curso4 = await prisma.curso.create({
    data: {
      nombreCurso: "Python e Inteligencia Artificial",
      descripcion: "Fundamentos de ML",
      duracionHoras: 40,
      horario: "Vie 18:00 - 22:00",
      docenteId: docente4.id,
      aulaId: aula4.id,
    },
  });

  // 6. Crear 4 Matrículas
  await prisma.matricula.createMany({
    data: [
      {
        estudianteId: estudiante1.id,
        cursoId: curso1.id,
        calificacionFinal: 18.5,
        estado: "APROBADO",
      },
      {
        estudianteId: estudiante2.id,
        cursoId: curso1.id,
        estado: "INSCRITO",
      },
      {
        estudianteId: estudiante3.id,
        cursoId: curso2.id,
        calificacionFinal: 16.0,
        estado: "APROBADO",
      },
      {
        estudianteId: estudiante4.id,
        cursoId: curso3.id,
        calificacionFinal: 9.5,
        estado: "REPROBADO",
      },
    ],
  });

  console.log("Base de datos poblada correctamente:", { directorId: director.id });
}

async function runSeed() {
  try {
    await main();
    console.log("Datos insertados con éxito.");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();