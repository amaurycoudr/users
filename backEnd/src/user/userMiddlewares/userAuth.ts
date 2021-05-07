import { NextFunction, Request, Response } from "express";
import User from "../userDB/userModel";
import { tokenUser } from "../userServices";

export interface RequestWithUser extends Request {
  user?: User;
}

const userAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.token;
  try {
    const user = await tokenUser(token);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default userAuth;
