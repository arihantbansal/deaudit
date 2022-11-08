import express from "express";
import {
	addUser,
	getAllUsers,
	getUserData,
	updateUserData,
} from "../controllers/users";

const userRouter = express.Router();

//@route	GET /users
//@desc		GET users
userRouter.get("/", getAllUsers);

//@route	POST /users/
//@desc		Add user
userRouter.post("/", addUser);

//@route	GET /users/:address
//@desc		Get user details
userRouter.get("/:address", getUserData);

//@route	PUT /users/:address
//@desc		Update user data
userRouter.put("/:address", updateUserData);

export default userRouter;
