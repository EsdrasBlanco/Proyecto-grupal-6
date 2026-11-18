import { Router } from "express";
import {
  createCurso,
  deleteCurso,
  getCursos,
  getCursoById,
  putCurso,
} from "../controllers/curso.controller";

const router = Router();

router.get("/", getCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);
router.put("/:id", putCurso);
router.delete("/:id", deleteCurso);

export default router;
