import jwt from "jsonwebtoken";
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
