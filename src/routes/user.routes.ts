
import { Router } from "express";
import {
  createUserController,
  getUsersController,
} from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/user.middleware";

const router = Router();

router.get("/", getUsersController);

router.post("/", validateCreateUser, createUserController);

export default router;
