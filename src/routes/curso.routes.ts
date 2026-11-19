import { Router } from "express";
import {
  createCurso,
  deleteCurso,
  getCursos,
  getCursoById,
  putCurso,
} from "../controllers/curso.controller";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

// Lectura: cualquier usuario autenticado
router.get("/", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getCursos);
router.get("/:id", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getCursoById);

// Creación, cambios y eliminación: solo DIRECTOR
router.post("/", authenticate, authorizeRoles("DIRECTOR"), createCurso);
router.put("/:id", authenticate, authorizeRoles("DIRECTOR"), putCurso);
router.delete("/:id", authenticate, authorizeRoles("DIRECTOR"), deleteCurso);

export default router;
