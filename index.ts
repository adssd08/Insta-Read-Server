import express from "express";
import cors from "cors";
import { loginRouter } from "./routes/login.routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { verifyLoginCreds } from "./middleware/login.middleware";
import { MONGODB_URI, PORT } from "./config";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("", authRouter);
app.use("", verifyLoginCreds, loginRouter);
app.get("/", (req, res) => {
	res.send("Hello World");
});

mongoose
	.connect(MONGODB_URI, { autoCreate: true })
	.then(() => {
		console.log("DB Connected Successfully");
		app.listen(PORT, () => {
			console.log(`App is listening on port: ${PORT}`);
		});
	})
	.catch(err => {
		console.log("Error occured while connecting to DB: ", err);
	});
