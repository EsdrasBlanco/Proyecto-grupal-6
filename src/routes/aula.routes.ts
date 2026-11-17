import { Router } from "express";
import { getAulas, createAula } from "../controllers/aula.controller";

const router = Router();

router.get("/", getAulas);
router.post("/", createAula);

export default router;
