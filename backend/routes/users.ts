import express from "express";
import { addUser, getUserData, updateUserData } from "../controllers/users";

const userRouter = express.Router();

//@route	POST /user/
//@desc		Add user
userRouter.post("/", addUser);

//@route	GET /user/:id
//@desc		Get user details
userRouter.get("/:id", getUserData);

//@route	PUT /user/:id
//@desc		Update user data
userRouter.put("/:id", updateUserData);

export default userRouter;
