import {
  ERROR_ALREADY_USE,
  ERROR_BAD_ID,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
  ERROR_UNAUTHORIZED,
} from "../../error/errorMessage";
import {
  editDBUser,
  findUserByCredential,
  findUserById,
} from "../userDB/userDBInteraction";
import User, { UserDBEdit, UserRequestEdit } from "../userDB/userModel";
import { check, password } from "../userUtils";

const editUser = async (
  edit: UserRequestEdit | undefined,
  id: string | undefined,
  user: User
) => {
  if (!id || !parseInt(id, 10)) {
    throw new Error(ERROR_BAD_ID);
  }
  const intId = parseInt(id, 10);
  if (user.id !== intId && !user.isAdmin) {
    throw new Error(ERROR_UNAUTHORIZED);
  }
  if (user.isAdmin && user.id !== intId && !findUserById(intId)) {
    throw new Error(ERROR_BAD_ID);
  }
  if (!edit) {
    throw new Error(ERROR_MISSING_FILED);
  }

  let finalEdit: UserDBEdit = {};
  if (edit.email) {
    const userEmail = await findUserByCredential(edit.email);
    if (check.checkUserEmail(edit.email)) {
      if (userEmail && userEmail.id !== intId) {
        throw new Error(ERROR_ALREADY_USE);
      } else {
        finalEdit = { ...finalEdit, email: edit.email };
      }
    } else {
      throw new Error(ERROR_INVALID_EMAIL);
    }
  }
  if (edit.name) {
    finalEdit = { ...finalEdit, name: edit.name };
    if (check.checkUserNameLength(edit.name)) {
      const userName = await findUserByCredential(edit.name);
      if (userName && userName.id !== intId) {
        throw new Error(ERROR_ALREADY_USE);
      } else {
        finalEdit = { ...finalEdit, name: edit.name };
      }
    } else {
      throw new Error(ERROR_INVALID_NAME);
    }
  }
  if (edit.password && check.checkUserPassword(edit.password)) {
    if (check.checkUserPassword(edit.password)) {
      const { hashPassword, salt } = password.hashSaltPassword(edit.password);
      finalEdit = { ...finalEdit, salt, password: hashPassword };
    } else {
      throw new Error(ERROR_INVALID_PASSWORD);
    }
  }

  const editedUser = await editDBUser(user, finalEdit);
  const { name, email } = editedUser;
  const token = password.createToken(intId);
  return { name, email, token, id };
};

export default editUser;
