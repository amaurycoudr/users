import { createUser, identifyUser } from "../../userServices";

import {
  ERROR_BAD_EMAIL_NAME,
  ERROR_BAD_PASSWORD,
} from "../../../error/errorMessage";
import userTestSetUp from "../userTestSetUp";

userTestSetUp();
const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};
describe("Check if identifyUser works as intended", () => {
  let userToken = "";
  beforeEach(async () => {
    const { token } = await createUser(
      userTest.email,
      userTest.name,
      userTest.password
    );
    userToken = token;
  });
  test("return token if good password and userName is provide", async () => {
    expect.assertions(1);
    try {
      const token = await identifyUser(userTest.name, userTest.password);
      expect(token).toBe(userToken);
    } catch (error) {
      console.log(error);
    }
  });
  test("throw an error when user doesn't exist", async () => {
    expect.assertions(1);
    try {
      await identifyUser("userTest.name", userTest.password);
    } catch (error) {
      expect(error.message).toBe(ERROR_BAD_EMAIL_NAME);
    }
  });
  test("throw an error when the password is wrong", async () => {
    expect.assertions(1);
    try {
      await identifyUser(userTest.name, " userTest.password");
    } catch (error) {
      expect(error.message).toBe(ERROR_BAD_PASSWORD);
    }
  });
});
