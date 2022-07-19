// import packages
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// import routers
import userRouter from "./routes/users.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan("dev"));

app.use("/user", userRouter);

export default app;
