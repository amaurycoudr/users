import { Router } from "express";
import {
  userAvailable,
  userEdit,
  userSignIn,
  userSignUp,
} from "../userControllers";
import userAuth from "../userMiddlewares/userAuth";

const userRoutes = Router();

userRoutes.post("", userSignUp);
userRoutes.post("/login", userSignIn);
userRoutes.post("/identifier", userAvailable);
userRoutes.patch("/:userId", userAuth, userEdit);

export default userRoutes;
