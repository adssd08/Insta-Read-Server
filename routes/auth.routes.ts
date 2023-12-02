import { Router } from "express";
import { resendToken, verifyToken } from "../controllers/auth.cotroller";

export const authRouter = Router();

authRouter.post("/verify-token", verifyToken);
authRouter.post("/resend-token", resendToken);
