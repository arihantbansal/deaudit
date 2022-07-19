import express from "express";
import { addAudit, getAudit } from "../controllers/audits.js";

const auditRouter = express.Router();

//@route	GET /audit/
//@desc		Get list of audits
auditRouter.get("/", getAllAudits);

//@route	POST /audit/
//@desc		Add audit
auditRouter.post("/", addAudit);

//@route	GET /audit/:id
//@desc		Get audit details
auditRouter.get("/:id", getAudit);

export default auditRouter;
