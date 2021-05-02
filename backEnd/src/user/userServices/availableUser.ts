import { ERROR_MISSING_FILED } from "../../error/errorMessage";
import { findUserByCredential } from "../userDB/userDBInteraction";

const availableUser = async (identifier: string | undefined) => {
  if (!identifier) {
    throw new Error(ERROR_MISSING_FILED);
  }
  const user = await findUserByCredential(identifier);
  return !user;
};
export default availableUser;
