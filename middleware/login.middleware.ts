import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../Utils/utilities";
import { ValidationError } from "yup";

export const verifyLoginCreds = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await loginSchema.validate(req.body);
		return next();
	} catch (error: any) {
		let knownError = error as ValidationError;
		return res.status(400).json({ error: knownError.errors[0] });
	}
};
