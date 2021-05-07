import { NextFunction, Response } from "express";
import { RequestWithUser } from "../userMiddlewares/userAuth";
import editUser from "../userServices/editUser";

const userEdit = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.userId;
  const edit = req.body;
  const user = req.user!;
  try {
    const editedUser = await editUser(edit, id, user);
    res.status(201).send(editedUser);
  } catch (error) {
    next(error);
  }
};

export default userEdit;
