import { ERROR_UNEXPECTED } from "../../../error/errorMessage";
import {
  createDBUser,
  findUserByCredential,
} from "../../userDB/userDBInteraction";
import User, { UserAttributes } from "../../userDB/userModel";
import userTestSetUp from "../userTestSetUp";
const createDBUserTest = async (user: UserAttributes) =>
  await createDBUser(
    user.email,
    user.name,
    user.password,
    user.salt,
    user.token
  );
const checkSameUser = (user1: UserAttributes, user2: User) => {
  expect(user1.name).toBe(user2.name);
  expect(user1.salt).toBe(user2.salt);
  expect(user1.email).toBe(user2.email);
  expect(user1.password).toBe(user2.password);
};
const userTest1: UserAttributes = {
  id: 1,
  email: "amaury@mail.com",
  name: "test",
  password: "paskmc#1",
  salt: "lkncenklan",
  token: "leTokenenfaite",
};

const badUserTest: UserAttributes = {
  id: 1,
  email: "amaury@mail.com",
  name: "test",
  password: undefined as any,
  salt: "lkncenklan",
  token: "leTokenenfaite",
};
userTestSetUp();

describe("Check if createDBUser works as intended", () => {
  test("create a user as expected", () => {
    return createDBUserTest(userTest1).then((user) => {
      checkSameUser(userTest1, user);
    });
  });
  test("throw an error when an argument is missing", () => {
    expect.assertions(1);
    return createDBUserTest(badUserTest).catch((error: Error) => {
      expect(error.message).toBe(ERROR_UNEXPECTED);
    });
  });
});

describe("Check if findUserByCredential works as intended", () => {
  beforeEach(async () => {
    await createDBUserTest(userTest1);
  });
  test("return the user when we the good email is give ", async () => {
    const user = await findUserByCredential(userTest1.email);
    checkSameUser(userTest1, user!);
  });
  test("return the user when we the good name is give ", async () => {
    const user = await findUserByCredential(userTest1.name);
    checkSameUser(userTest1, user!);
  });
  test("return null when we no user correspond ", () => {
    return findUserByCredential(userTest1.name).then((user) => {
      expect(user).toBeNull;
    });
  });
});
