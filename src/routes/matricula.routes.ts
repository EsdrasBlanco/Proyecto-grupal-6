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

const router = Router();

router.get("/", getMatriculasController);
router.get("/:id", getMatriculaByIdController);
router.post("/", validateCreateMatricula, createMatriculaController);
router.patch("/:id", validateUpdateMatricula, updateMatriculaController);
router.delete("/:id", deleteMatriculaController);

export default router;
