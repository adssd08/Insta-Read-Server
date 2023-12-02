import { IUser } from "../Utils/interfaces";
import { User } from "../models/users.model";
import { userCreationFailure, userExist, userNotExist } from "../Utils/strings";
import { decryptData, encryptData, generateJWTToken } from "../Utils/utilities";
import { TokenVerifictionError } from "../Utils/customError";
import { TokenValidity } from "../Utils/constants";

export const createUser = async (userData: IUser) => {
	const query = User.findOne({ email: userData.email });
	const user = await query;
	console.log("User : ", user);

	if (!user) {
		try {
			const user = await User.create({ email: userData.email, password: userData.password, verifyToken: new Date().valueOf() + TokenValidity });
			return { email: user.email, verificationToken: encryptData(JSON.stringify({ email: user.email, verifyToken: user.verifyToken })) };
		} catch (err) {
			throw userCreationFailure;
		}
	}

	throw userExist;
};

export const getUser = async (userData: IUser) => {
	const query = User.findOne(userData);
	const user = await query;
	if (user) {
		return user.token;
	}

	throw userNotExist;
};

export const verifyEmail = async (token: string) => {
	let currentTime = new Date().valueOf();
	try {
		const decryptedData = JSON.parse(decryptData(token));
		const query = User.findOne({ email: decryptedData.email });
		const user = await query;
		if (!user) throw "Invalid";
		if (user && user.verifyToken) {
			if (decryptedData.verifyToken > currentTime) {
				await user.updateOne({ $set: { token: generateJWTToken({ userId: user._id, userEmail: user.email }, "2h") }, $unset: { verifyToken: "" } });
				return user.token;
			} else {
				throw new TokenVerifictionError("Token Expired");
			}
		} else {
			throw new TokenVerifictionError("Email already verified. Please signin to access your account.");
		}
	} catch (err) {
		if (err instanceof TokenVerifictionError) {
			throw err.message;
		}
		throw "Invalid Token";
	}
};

export const resendVerificationToken = async (token: string) => {
	let currentTime = new Date().valueOf();
	try {
		const decryptedData = JSON.parse(decryptData(token));
		const query = User.findOne({ email: decryptedData.email });
		const user = await query;
		if (!user) throw "Invalid";
		if (user && user.verifyToken) {
			if (user.verifyToken > currentTime) {
				throw new TokenVerifictionError("Another token is already sent to your email.");
			} else {
				await user.updateOne({ $set: { verifyToken: currentTime + TokenValidity } });
				return encryptData(JSON.stringify({ email: user.email, verifyToken: user.verifyToken }));
			}
		} else {
			throw new TokenVerifictionError("Email already verified. Please signin to access your account.");
		}
	} catch (err) {
		if (err instanceof TokenVerifictionError) {
			throw err.message;
		}
		throw "Invalid Token";
	}
};
