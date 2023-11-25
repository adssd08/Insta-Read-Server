import { Request, Response } from "express";
import { createUser, getUser } from "../services/users.service";

export const signup = async (req: Request, res: Response) => {
	try {
		console.log("Body :", req.body);
		const token = await createUser(req.body);
		res.status(201).send({ token });
	} catch (error) {
		res.status(400).send({ error });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		console.log("Body: ", req.body);
		const token = await getUser(req.body);
		res.status(200).send(token);
	} catch (error) {
		res.status(400).send({ error });
	}
};
