import { NextFunction, Request, Response } from "express";
import availableUser from "../userServices/availableUser";

const userAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const identifier = req.body.identifier;
  try {
    const result = await availableUser(identifier);
    res.send({ available: result });
  } catch (error) {
    next(error);
  }
};
export default userAvailable;
