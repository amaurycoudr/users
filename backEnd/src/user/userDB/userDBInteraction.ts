import { validate } from "email-validator";
import { ERROR_UNEXPECTED } from "../../error/errorMessage";
import User from "./userModel";

const findUserByCredential = async (credential: string) => {
  const isEmail = validate(credential);
  const user = await (isEmail
    ? User.findOne({ where: { email: credential } })
    : User.findOne({ where: { name: credential } }));
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
    const newUser = await User.create({
      name,
      email,
      password,
      salt,
      token,
    });
    return newUser;
  } catch (e) {
    throw new Error(ERROR_UNEXPECTED);
  }
};

export { findUserByCredential, createDBUser };
