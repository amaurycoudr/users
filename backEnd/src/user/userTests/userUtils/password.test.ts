import { password } from "../../userUtils";

describe("Check if hashSaltPassword works as intend", () => {
  test("check if hash(password+salt)===hashPassword", () => {
    const passwordUser = "kjanzakjAZE1";
    const { hashPassword, salt } = password.hashSaltPassword(passwordUser);
    expect(hashPassword).toBe(password.hash(passwordUser + salt));
  });
});
describe("Check if isPasswordValid works as intend", () => {
  test("check if isPasswordValid return true when good password is given", () => {
    const passwordUser = "kjanzakjAZE1";
    const { hashPassword, salt } = password.hashSaltPassword(passwordUser);
    expect(
      password.isPasswordValid(passwordUser, salt, hashPassword)
    ).toBeTruthy();
  });
  test("check if isPasswordValid return false when bad password is given", () => {
    const passwordUser = "kjanzakjAZE1";
    const badPassword = "jknazdakj";
    const { hashPassword, salt } = password.hashSaltPassword(passwordUser);
    expect(
      password.isPasswordValid(badPassword, salt, hashPassword)
    ).toBeFalsy();
  });
});
