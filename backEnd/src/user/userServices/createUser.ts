import jwt from "jsonwebtoken";
import {
  ERROR_ALREADY_USE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
} from "../../error/errorMessage";
import {
  createDBSignInUser,
  findUserByCredential,
} from "../userDB/userDBInteraction";
import {
  check,
  name as nameUtils,
  password as passwordUtils,
} from "../userUtils";

const checkNewUserValid = async (
  email: string | undefined,
  userName: string | undefined,
  password: string | undefined
) => {
  const userSameEmail = await findUserByCredential(email || "");
  const userSameName = await findUserByCredential(userName || "");

  const isNoMissingField = !(!email || !userName || !password);
  const isEmailValid = check.checkUserEmail(email);
  const isNameValid = check.checkUserNameLength(userName);
  const isPasswordValid = check.checkUserPassword(password);

  const isUnique = !Boolean(userSameName || userSameEmail);

  if (!isNoMissingField) {
    throw new Error(ERROR_MISSING_FILED);
  } else if (!isNameValid) {
    throw new Error(ERROR_INVALID_NAME);
  } else if (!isEmailValid) {
    throw new Error(ERROR_INVALID_EMAIL);
  } else if (!isPasswordValid) {
    throw new Error(ERROR_INVALID_PASSWORD);
  } else if (!isUnique) {
    console.log();

    throw new Error(ERROR_ALREADY_USE);
  }
};

const createUser = async (
  newUserEmail?: string,
  newUserName?: string,
  newUserPassword?: string
) => {
  const userName = nameUtils.reformatUserName(newUserName || "");

  await checkNewUserValid(newUserEmail, userName, newUserPassword);

  const { hashPassword, salt } = passwordUtils.hashSaltPassword(
    newUserPassword!
  );
  console.log(process.env.JWT_KEY);
  const token = jwt.sign(
    { name: newUserName, email: newUserName },
    process.env.JWT_KEY!
  );
  const newUser = await createDBSignInUser(
    newUserEmail!,
    userName,
    hashPassword,
    salt,
    token
  );
  const { name, email, id } = newUser;

  return { name, email, id, token };
};

export default createUser;
