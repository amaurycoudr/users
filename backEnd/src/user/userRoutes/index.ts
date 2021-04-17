import { Router } from "express";
import { userSignIn, userSignUp } from "../userMiddlewares";

const userRoutes = Router();

userRoutes.post("", userSignUp);
userRoutes.post("/me", userSignIn);

export default userRoutes;
