import crypto from "crypto";
import csprng from "csprng";
import jwt from "jsonwebtoken";

const hash = (pwd: string) => {
  return crypto.createHash("sha256").update(pwd).digest("base64");
};

const hashSaltPassword = (password: string) => {
  const salt = csprng(160, 36);
  const hashPassword = hash(`${password}${salt}`);
  return { hashPassword, salt };
};
const isPasswordValid = (
  passwordGuess: string,
  salt: string,
  hashPassword: string
) => {
  const hashPasswordGuess = hash(`${passwordGuess}${salt}`);
  return hashPassword === hashPasswordGuess;
};

export interface tokenInfo {
  id: number;
}
const createToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_KEY!);
};
export default {
  hashSaltPassword,
  isPasswordValid,
  hash,
  createToken,
};
