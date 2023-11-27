import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginRouter } from "./routes/login.routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { verifyLoginCreds } from "./middleware/login.middleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("", verifyLoginCreds, loginRouter);
app.get("/", (req, res) => {
	res.send("Hello World");
});

mongoose
	.connect(process.env.MONGODB_URI!, { autoCreate: true })
	.then(() => {
		console.log("DB Connected Successfully");
		app.listen(process.env.PORT, () => {
			console.log(`App is listening on port: ${process.env.PORT}`);
		});
	})
	.catch(err => {
		console.log("Error occured while connecting to DB: ", err);
	});
