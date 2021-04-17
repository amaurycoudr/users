import { Router } from "express";
import { userSignIn, userSignUp } from "../userControllers";

const userRoutes = Router();

userRoutes.post("", userSignUp);
userRoutes.post("/me", userSignIn);

export default userRoutes;
