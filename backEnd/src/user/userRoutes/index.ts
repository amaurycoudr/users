import { Router } from "express";
import { userAvailable, userSignIn, userSignUp } from "../userControllers";

const userRoutes = Router();

userRoutes.post("", userSignUp);
userRoutes.post("/login", userSignIn);
userRoutes.post("/identifier", userAvailable);

export default userRoutes;
