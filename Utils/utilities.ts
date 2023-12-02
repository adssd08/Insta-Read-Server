import jwt from "jsonwebtoken";
import { object, string } from "yup";
import { AES_KEY, JWT_TOKEN_KEY } from "../config";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { encryptionType } from "./constants";

export const generateJWTToken = (payload: any, validity: string) => {
	return jwt.sign(payload, JWT_TOKEN_KEY, { expiresIn: validity });
};

const getCharacterValidationError = (str: string) => {
	return `Your password must have at least 1 ${str} character`;
};

export const loginSchema = object({
	email: string().email().required(),
	password: string()
		.required("password is a required field")
		.matches(/[A-Z]/, getCharacterValidationError("uppercase"))
		.matches(/[a-z]/, getCharacterValidationError("lowercase"))
		.matches(/[0-9]/, getCharacterValidationError("digit"))
		.min(8, "Password must have at least 8 characters")
		.max(20, "Password must not be greater than 20 characters"),
});

const encryptionIV = createHash("sha512").digest("hex").substring(0, 16);

export const generateAesKey = () => {
	const aesKey = randomBytes(16).toString("hex");
	console.log("Generated AES Key: ", aesKey);
};

export const encryptData = (data: string) => {
	const cipher = createCipheriv(encryptionType, AES_KEY, encryptionIV);
	return Buffer.from(cipher.update(data, "utf8", "hex") + cipher.final("hex")).toString("base64");
};

export const decryptData = (encryptedData: string) => {
	const buff = Buffer.from(encryptedData, "base64");
	const decipher = createDecipheriv(encryptionType, AES_KEY, encryptionIV);
	return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
};
