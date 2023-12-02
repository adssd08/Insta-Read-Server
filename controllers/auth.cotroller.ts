import { Request, Response } from "express";
import { resendVerificationToken, verifyEmail } from "../services/users.service";
import { TokenVerifictionError } from "../Utils/customError";
import { sendSignUpEmail } from "../services/nodemailer.service";

export const verifyToken = async (req: Request, res: Response) => {
	try {
		console.log("Body: ", req.body);
		const token = await verifyEmail(req.body.token);
		res.status(200).json({ token });
	} catch (error) {
		const err = error as TokenVerifictionError;
		res.status(400).json({ message: err.message, errorCode: err.errorCode });
	}
};

export const resendToken = async (req: Request, res: Response) => {
	try {
		console.log("Body: ", req.body);
		const { verificationToken, email } = await resendVerificationToken(req.body.token);
		await sendSignUpEmail(verificationToken, email);
		res.status(200).json({ message: "Verification email sent to your email address." });
	} catch (error) {
		const err = error as TokenVerifictionError;
		res.status(400).json({ message: err.message, errorCode: err.errorCode });
	}
};
