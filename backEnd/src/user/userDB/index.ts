import User from "./userModel";
import { createDBUser, findUserByCredential } from "./userDBInteraction";

export default {
  User: User,
  createDBUser,
  findUserByCredential,
};
