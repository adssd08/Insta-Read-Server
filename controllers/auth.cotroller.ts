import { Request, Response } from "express";
import { verifyEmail } from "../services/users.service";

export const verifyToken = async (req: Request, res: Response) => {
	try {
		console.log("Body: ", req.body);
		const token = await verifyEmail(req.body.token);
		res.status(200).json({ token });
	} catch (error) {
		res.status(400).json({ error });
	}
};
