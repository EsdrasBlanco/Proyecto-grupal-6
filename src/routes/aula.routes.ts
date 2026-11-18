import { Router } from "express";
import {
  createAula,
  deleteAula,
  getAulas,
  getAulaById,
  putAula,
} from "../controllers/aula.controller";

const router = Router();

router.get("/", getAulas);
router.get("/:id", getAulaById);
router.post("/", createAula);
router.put("/:id", putAula);
router.delete("/:id", deleteAula);

export default router;
