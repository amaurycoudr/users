import { createUser } from "../../userServices";
import {
  ERROR_ALREADY_USE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
} from "../../../error/errorMessage";
import userTestSetUp from "../userTestSetUp";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};
userTestSetUp();
describe("Check if createUser works as intended", () => {
  test("create a user when arguments are good", async () => {
    expect.assertions(4);
    try {
      const user = await createUser(
        userTest.email,
        userTest.name,
        userTest.password
      );
      expect(user.name).toMatch(userTest.name);
      expect(user.email).toMatch(userTest.email);
      expect(user.token).toBeTruthy();
      expect(user.id).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });

  test("throw an error when an argument is missing", async () => {
    expect.assertions(1);
    try {
      await createUser(undefined, userTest.name, userTest.password);
    } catch (error) {
      expect(error.message).toMatch(ERROR_MISSING_FILED);
    }
  });

  test("throw an error when name is empty", async () => {
    expect.assertions(1);
    try {
      await createUser(userTest.email, "", userTest.password);
    } catch (error) {
      expect(error.message).toMatch(ERROR_MISSING_FILED);
    }
  });

  test("throw an error when email is invalid", async () => {
    expect.assertions(1);
    try {
      await createUser("ùam@zzl;ma", userTest.name, userTest.password);
    } catch (error) {
      expect(error.message).toMatch(ERROR_INVALID_EMAIL);
    }
  });

  test("throw an error when name is invalid", async () => {
    expect.assertions(1);
    try {
      await createUser(userTest.email, "ame", userTest.password);
    } catch (error) {
      expect(error.message).toMatch(ERROR_INVALID_NAME);
    }
  });
  test("throw an error when password is invalid", async () => {
    expect.assertions(1);
    try {
      await createUser(userTest.email, userTest.name, "passsxs");
    } catch (error) {
      expect(error.message).toMatch(ERROR_INVALID_PASSWORD);
    }
  });

  describe("", () => {
    beforeEach(async () => {
      await createUser(userTest.email, userTest.name, userTest.password);
    });

    test("throw an error when email already exist", async () => {
      expect.assertions(1);
      try {
        await createUser(
          userTest.email,
          "userTest.name",
          "userTest.passwor1&d"
        );
      } catch (error) {
        expect(error.message).toMatch(ERROR_ALREADY_USE);
      }
    });
    test("throw an error when name already exist", async () => {
      expect.assertions(1);
      try {
        await createUser(
          "userTest.email@mail.com",
          userTest.name,
          "userTest.passwor1&d"
        );
      } catch (error) {
        expect(error.message).toMatch(ERROR_ALREADY_USE);
      }
    });
  });
});
