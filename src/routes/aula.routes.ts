import { Router } from "express";
import {
  createAula,
  deleteAula,
  getAulas,
  getAulaById,
  putAula,
} from "../controllers/aula.controller";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

// Lectura: cualquier usuario autenticado
router.get("/", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getAulas);
router.get("/:id", authenticate, authorizeRoles("ESTUDIANTE", "DOCENTE", "DIRECTOR"), getAulaById);

// Creación, cambios y eliminación: solo DIRECTOR
router.post("/", authenticate, authorizeRoles("DIRECTOR"), createAula);
router.put("/:id", authenticate, authorizeRoles("DIRECTOR"), putAula);
router.delete("/:id", authenticate, authorizeRoles("DIRECTOR"), deleteAula);

export default router;
