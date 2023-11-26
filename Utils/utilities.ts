import jwt from "jsonwebtoken";
import { object, string } from "yup";
import { ObjectId } from "mongodb";
export const generateJWTToken = (userId: ObjectId, email: string) => {
	return jwt.sign(
		{
			userId,
			email,
		},
		process.env.JWT_TOKEN_KEY!,
		{ expiresIn: "2h" }
	);
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
