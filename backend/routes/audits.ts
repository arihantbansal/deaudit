import express from "express";
import {
	addAudit,
	getAllAudits,
	getAuditData,
	updateAuditData,
} from "../controllers/audits";

const auditRouter = express.Router();

//@route	GET /audit/
//@desc		Get list of audits
auditRouter.get("/", getAllAudits);

//@route	POST /audit/
//@desc		Add audit
auditRouter.post("/", addAudit);

//@route	GET /audit/:id
//@desc		Get audit details
auditRouter.get("/:id", getAuditData);

//@route	PUT /audit/:id
//@desc		Update audit details
auditRouter.put("/:id", updateAuditData);

export default auditRouter;
