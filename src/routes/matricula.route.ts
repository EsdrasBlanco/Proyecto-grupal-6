// src/routes/matricula.route.ts modificado por otro usuario
// src/routes/matricula.route.ts
import { Router } from "express";
import {
  getMatriculasController,
  getMatriculaByIdController,
  getMatriculasByAulaController,
  createMatriculaController,
  updateMatriculaController,
  deleteMatriculaController,
} from "../controllers/matricula.controller";
import {
  validateCreateMatricula,
  validateUpdateMatricula,
} from "../middlewares/matricula.middleware";

const matriculaRouter = Router();

matriculaRouter.get("/", getMatriculasController);
matriculaRouter.get("/aula/:aulaId", getMatriculasByAulaController);
matriculaRouter.get("/:id", getMatriculaByIdController);
matriculaRouter.post("/", validateCreateMatricula, createMatriculaController);
matriculaRouter.patch("/:id", validateUpdateMatricula, updateMatriculaController);
matriculaRouter.delete("/:id", deleteMatriculaController);

export default matriculaRouter;
// fin - src/routes/matricula.route.ts 