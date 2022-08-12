import express from "express";
import { getAllTags } from "../controllers/tags";

const tagsRouter = express.Router();

tagsRouter.get("/", getAllTags);

export default tagsRouter;
