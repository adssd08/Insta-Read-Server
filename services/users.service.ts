import isEmail from "validator/lib/isEmail";
import { IUser } from "../Utils/interfaces";
import { User } from "../models/users.model";
import { userCreationFieldsFailure, userExist, userNotExist } from "../Utils/strings";
import { generateJWTToken } from "../Utils/utilities";

export const createUser = async (userData: IUser) => {
	if (!isEmail(userData.email)) {
		throw "Invalid Email";
	}

	const query = User.findOne({ email: userData.email });
	const user = await query;
	console.log("User : ", user);

	if (!user) {
		try {
			const user = await User.create(userData);
			user.token = generateJWTToken(user._id, user.email);
			return user.token;
		} catch (err) {
			throw userCreationFieldsFailure;
		}
	}

	throw userExist;
};

export const getUser = async (userData: IUser) => {
	if (!isEmail(userData.email)) {
		throw "Invalid Email";
	}

	const query = User.findOne(userData);
	const user = await query;
	if (user) {
		user.token = generateJWTToken(user._id, user.email);
		return user.token;
	}
	throw userNotExist;
};
