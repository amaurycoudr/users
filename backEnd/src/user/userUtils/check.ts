import { validate } from "email-validator";

const checkUserNameLength = (userName: string | undefined): Boolean => {
  return Boolean(userName && userName.length > 4 && userName.length < 20);
};
const checkUserPassword = (password: string | undefined) => {
  if (!password || password.length < 6) {
    return false;
  }
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength = strength + 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength = strength + 1;
  }
  if (password.match(/[0-9]+/)) {
    strength = strength + 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength = strength + 1;
  }
  return strength > 2;
};
const checkUserEmail = (email: string | undefined) => {
  return email && validate(email);
};
export default { checkUserPassword, checkUserNameLength, checkUserEmail };
