import jwt from "jsonwebtoken";
import { ERROR_BAD_TOKEN, ERROR_MISSING_FILED } from "../../error/errorMessage";
import { findUserById } from "../userDB/userDBInteraction";
import { tokenInfo } from "../userUtils/password";

const tokenUser = async (token: string | undefined) => {
  if (!token) {
    throw new Error(ERROR_MISSING_FILED);
  }
  const info = jwt.verify(token, process.env.JWT_KEY!) as tokenInfo;

  const user = await findUserById(info.id);
  if (!user) {
    throw new Error(ERROR_BAD_TOKEN);
  }
  return user;
};

export default tokenUser;
