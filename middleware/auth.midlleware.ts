import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.headers["Authorization"];
	const token = authorizationHeader && (authorizationHeader as string).split(" ")[1];
	if (!token) {
		return res.status(403).send("Token required for authentication");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY!);
		console.log("Decoded Value: ", decoded);
	} catch (err) {
		return res.send(401).send("Invalid Token");
	}

	return next();
};
