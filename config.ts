import dotenv from "dotenv";
dotenv.config();

// Prod Build
export const PROD = false;

// To use nodemailer service I have used ethereal (https://ethereal.email/) for testing
export const NODEMAILER_CONFIG = {
	host: PROD ? (process.env.NODEMAILER_PROD_HOST as string) : (process.env.NODEMAILER_HOST as string),
	port: PROD ? (process.env.NODEMAILER_PROD_SMTP_PORT as unknown as number) : (process.env.NODEMAILER_SMTP_PORT as unknown as number),
	auth: {
		user: PROD ? (process.env.NODEMAILER_PROD_AUTH_USER as string) : (process.env.NODEMAILER_AUTH_USER as string),
		pass: PROD ? (process.env.NODEMAILER_PROD_AUTH_PASS as string) : (process.env.NODEMAILER_AUTH_PASS as string),
	},
};

export const FROM_EMAIL = PROD ? process.env.NODEMAILER_FROM_EMAIL : "noreply@instaread.com";

// MongoDB Uri obtained after generating cluster and select nodejs as connection method
export const MONGODB_URI = process.env.MONGODB_URI as string;

// Port where you want to host your project
export const PORT = process.env.PORT;

// Random string
export const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY as string;

// Random Generate AES Key using utilities generateRandomString Function
export const AES_KEY = process.env.AES_KEY as string;
