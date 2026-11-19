// src/routes/matricula.routes.ts
import { Router } from "express";
import {
  getMatriculasController,
  getMatriculaByIdController,
  createMatriculaController,
  updateMatriculaController,
  deleteMatriculaController,
} from "../controllers/matricula.controller";
import {
  validateCreateMatricula,
  validateUpdateMatricula,
} from "../middlewares/matricula.middleware";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

// Lectura: cualquier usuario autenticado
router.get("/", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getMatriculasController);
router.get("/:id", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getMatriculaByIdController);

// Inscripción: el estudiante se inscribe o el DIRECTOR lo inscribe
router.post(
  "/",
  authenticate,
  authorizeRoles("ESTUDIANTE", "DIRECTOR"),
  validateCreateMatricula,
  createMatriculaController
);

// Calificación / cambio de estado: DOCENTE o DIRECTOR
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("DOCENTE", "DIRECTOR"),
  validateUpdateMatricula,
  updateMatriculaController
);

// Eliminación: solo DIRECTOR
router.delete("/:id", authenticate, authorizeRoles("DIRECTOR"), deleteMatriculaController);

export default router;
