import mongoose from "mongoose";
import { ERROR_CALL_DATABASE } from "../../../error/errorMessage";
import {
  createDBUser,
  findUserByCredential,
} from "../../userDB/userDBInteraction";
import { UserDocument, UserType } from "../../userDB/userModel";
const createUser = (user: UserType) =>
  createDBUser(user.email, user.name, user.password, user.salt, user.token);
const checkSameUser = (user1: UserType, user2: UserDocument) => {
  expect(user1.token).toBe(user2.token);
  expect(user1.name).toBe(user2.name);
  expect(user1.salt).toBe(user2.salt);
  expect(user1.email).toBe(user2.email);
  expect(user1.password).toBe(user2.password);
};
const userTest1: UserType = {
  email: "amaury@mail.com",
  name: "test",
  password: "paskmc#1",
  salt: "lkncenklan",
  token: "leTokenenfaite",
};
const userTest2: UserType = {
  email: "amaury@mail.com",
  name: "tessst",
  password: "pasksmc#1",
  salt: "lkncenklsan",
  token: "leTosksenenfaite",
};
const userTest3: UserType = {
  email: "amadsury@mail.com",
  name: "test",
  password: "paskmc#1",
  salt: "lkncenklan",
  token: "leTokenenfaite",
};

const badUserTest: UserType = {
  email: "amaury@mail.com",
  name: "test",
  password: undefined as any,
  salt: "lkncenklan",
  token: "leTokenenfaite",
};
beforeEach((done) => {
  mongoose.connect(
    "mongodb://mongo:27017/JestDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => done()
  );
});
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("Check if createDBUser works as intended", () => {
  test("create a user as expected", () => {
    expect.assertions(1);
    return createUser(userTest1).then((user) => {
      checkSameUser(userTest1, user);
    });
  });
  test("throw an error when an argument is missing", () => {
    expect.assertions(1);
    return createUser(badUserTest).catch((error: Error) => {
      expect(error.message).toBe(ERROR_CALL_DATABASE);
    });
  });
  beforeEach(async () => {
    await createUser(userTest1);
  });
  test("throw an error when an email already exist in the DB ", () => {
    expect.assertions(1);
    return createUser(userTest2).catch((error: Error) => {
      expect(error.message).toBe(ERROR_CALL_DATABASE);
    });
  });
  test("throw an error when an name already exist in the DB ", () => {
    expect.assertions(1);
    return createUser(userTest3).catch((error: Error) => {
      expect(error.message).toBe(ERROR_CALL_DATABASE);
    });
  });
});

describe("Check if findUserByCredential works as intended", () => {
  beforeEach(async () => {
    await createUser(userTest1);
  });
  test("return the user when we the good email is give ", () => {
    expect.assertions(5);
    return findUserByCredential(userTest1.email).then((user) => {
      checkSameUser(userTest1, user!);
    });
  });
  test("return the user when we the good name is give ", () => {
    expect.assertions(5);
    return findUserByCredential(userTest1.name).then((user) => {
      checkSameUser(userTest1, user!);
    });
  });
  test("return null when we no user correspond ", () => {
    expect.assertions(5);
    return findUserByCredential("njkl kjcna ekjn").then((user) => {
      expect(user).toBeNull;
    });
  });
});
