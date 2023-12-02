import nodemailer from "nodemailer";
import { FROM_EMAIL, NODEMAILER_CONFIG } from "../config";
import { signUpTemplate, signUpText } from "../Utils/signupTemplate";
const transporter = nodemailer.createTransport(NODEMAILER_CONFIG);

export const sendSignUpEmail = async (token: string, to: string) => {
	try {
		const info = await transporter.sendMail({
			from: `"Insta Read" <${FROM_EMAIL}>`, // sender address
			to, // list of receivers
			subject: "Finish creating your account on InstaRead", // Subject line
			text: signUpText(token), // plain text body
			html: signUpTemplate(token), // html body
		});
		console.log("Message sent: %s", info.messageId);
	} catch (err) {
		throw "Error while sending email for verification";
	}
};
