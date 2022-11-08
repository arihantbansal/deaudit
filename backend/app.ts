// import packages
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// import routers
import userRouter from "./routes/users";
import auditRouter from "./routes/audits";
import tagsRouter from "./routes/tags";
import bugRouter from "./routes/bugs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/audits", auditRouter);
app.use("/tags", tagsRouter);
app.use("/bugs", bugRouter);

export default app;
