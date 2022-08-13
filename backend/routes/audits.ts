import express from "express";
import {
	addAudit,
	getAllAudits,
	getAuditData,
	updateAuditData,
} from "../controllers/audits";

const auditRouter = express.Router();

//@route	GET /audits/
//@desc		Get list of audits
auditRouter.get("/", getAllAudits);

//@route	POST /audit/
//@desc		Add audit
auditRouter.post("/", addAudit);

//@route	GET /audit/:address
//@desc		Get audit details
auditRouter.get("/:address", getAuditData);

//@route	PUT /audit/:address
//@desc		Update audit details
auditRouter.put("/:address", updateAuditData);

export default auditRouter;
