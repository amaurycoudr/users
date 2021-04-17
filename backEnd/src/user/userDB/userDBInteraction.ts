import { validate } from "email-validator";
import { ERROR_CALL_DATABASE } from "../../error/errorMessage";
import userModel from "./userModel";

const findUserByCredential = async (credential: string) => {
  const isEmail = validate(credential);
  const user = await (isEmail
    ? userModel.findOne({ email: credential })
    : userModel.findOne({ name: credential }));
  return user;
};
const createDBUser = async (
  email: string,
  name: string,
  password: string,
  salt: string,
  token: string
) => {
  try {
    const newUser = await userModel.create({
      name,
      email,
      password,
      salt,
      token,
    });
    return newUser;
  } catch (e) {
    throw new Error(ERROR_CALL_DATABASE);
  }
};

export { findUserByCredential, createDBUser };
