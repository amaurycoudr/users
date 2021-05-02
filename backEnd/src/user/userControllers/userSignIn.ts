import { NextFunction, Request, Response } from "express";
import signInUser from "../userServices/signInUser";

const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;
  try {
    const token = await signInUser(identifier, password);
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

export default userSignIn;
