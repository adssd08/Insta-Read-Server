import { Router } from "express";
import { login, signup } from "../controllers/login.controller";
export const loginRouter = Router();

loginRouter.post("/signup", signup);
loginRouter.post("/login", login);
