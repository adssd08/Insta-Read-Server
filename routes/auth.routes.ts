import { Router } from "express";
import { verifyToken } from "../controllers/auth.cotroller";

export const authRouter = Router();

authRouter.post("/verify-token", verifyToken);
