import { Request, Response } from "express";
import { createUser, getUser } from "../services/users.service";
import { sendSignUpEmail } from "../services/nodemailer.service";

export const signup = async (req: Request, res: Response) => {
	try {
		console.log("Body :", req.body);
		const { verificationToken, email } = await createUser(req.body);
		await sendSignUpEmail(verificationToken, email);
		res.status(201).json({ message: "Verification email sent to your email address." });
	} catch (error) {
		res.status(400).json({ error });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		console.log("Body: ", req.body);
		const token = await getUser(req.body);
		res.status(200).json({ token });
	} catch (error) {
		res.status(400).json({ error });
	}
};
