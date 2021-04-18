import { Router } from "express";
import { userSignIn, userSignUp } from "../userControllers";

const userRoutes = Router();

userRoutes.post("", userSignUp);
userRoutes.post("/login", userSignIn);

export default userRoutes;
