import express from "express";
import { addUser, getUserData } from "../controllers/users.js";

const userRouter = express.Router();

//@route	POST /user/
//@desc		Add user
userRouter.post("/", addUser);

//@route	GET /user/:id
//@desc		Get user details
userRouter.get("/:id", getUserData);

export default userRouter;
