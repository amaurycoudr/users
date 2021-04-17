import { NextFunction, Request, Response } from "express";
import identifyUser from "../userServices/identifyUser";

const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;
  try {
    const token = await identifyUser(identifier, password);
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

export default userSignIn;
