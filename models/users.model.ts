import mongoose, { Schema } from "mongoose";
import { IUser } from "../Utils/interfaces";

const userSchema = new Schema<IUser>({
	email: { type: String, required: true, trim: true, lowercase: true },
	password: { type: String, required: true, minlength: 8, maxlength: 20 },
	token: { type: String },
});

export const User = mongoose.model<IUser>("User", userSchema);
