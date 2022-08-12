import express from "express";
import { getBugsByAudit, getBugsByUser } from "../controllers/bugs";

const bugRouter = express.Router();

bugRouter.get("/audits/:address", getBugsByAudit);
bugRouter.get("/users/:address", getBugsByUser);

export default bugRouter;
