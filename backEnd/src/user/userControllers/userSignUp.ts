import { NextFunction, Request, Response } from "express";
import { createUser } from "../userServices";

const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  try {
    const user = await createUser(email, name, password);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

export default userSignUp;
