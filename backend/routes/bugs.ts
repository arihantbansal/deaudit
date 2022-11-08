import express from "express";
import { addBug, getBugsByAudit, getBugsByUser } from "../controllers/bugs";

const bugRouter = express.Router();

//@route	GET /bugs/audits/:address
//@desc		Get list of bugs by audit
bugRouter.get("/audits/:address", getBugsByAudit);

//@route	GET /bugs/users/:address
//@desc		Get list of bugs by user
bugRouter.get("/users/:address", getBugsByUser);

//@route	POST /bugs/
//@desc		Add bug
bugRouter.post("/", addBug);

export default bugRouter;
