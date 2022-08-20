import express from "express";
import { getAllTags } from "../controllers/tags";

const tagsRouter = express.Router();

//@route	GET /tags
//@desc		GET all tags
tagsRouter.get("/", getAllTags);

export default tagsRouter;
