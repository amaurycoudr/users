import {
  ERROR_BAD_EMAIL_NAME,
  ERROR_BAD_PASSWORD,
} from "../../error/errorMessage";
import { findUserByCredential } from "../userDB/userDBInteraction";
import { name as nameUtils, password as passwordUtils } from "../userUtils";

const signInUser = async (credential: string, password: string) => {
  const user = await findUserByCredential(
    nameUtils.reformatUserName(credential)
  );
  if (!user) {
    throw new Error(ERROR_BAD_EMAIL_NAME);
  }
  const isGoodPassword = passwordUtils.isPasswordValid(
    password,
    user.salt,
    user.password
  );
  if (!isGoodPassword) {
    throw new Error(ERROR_BAD_PASSWORD);
  }
  return passwordUtils.createToken(user.id);
};

export default signInUser;
