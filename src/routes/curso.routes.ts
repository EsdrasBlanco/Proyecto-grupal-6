import { Router } from "express";
import { getCursos, createCurso } from "../controllers/curso.controller";

const router = Router();

router.get("/", getCursos);
router.post("/", createCurso);

export default router;
