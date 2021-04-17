import { createUser } from "../../userServices";
import mongoose from "mongoose";
import {
  ERROR_ALREADY_USE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
} from "../../../error/errorMessage";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
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

describe("Check if createUser works as intended", () => {
  test("create a user when arguments are good", () => {
    expect.assertions(4);
    return createUser(userTest.email, userTest.name, userTest.password).then(
      (user) => {
        expect(user.name).toMatch(userTest.name);
        expect(user.email).toMatch(userTest.email);
        expect(user.token).toBeTruthy();
        expect(user.id).toBeTruthy();
      }
    );
  });
  test("throw an error when an argument is missing", () => {
    expect.assertions(1);
    return createUser(undefined, undefined, undefined).catch((error: Error) =>
      expect(error.message).toMatch(ERROR_MISSING_FILED)
    );
  });
  test("throw an error when email is invalid", () => {
    expect.assertions(1);
    return createUser(
      "userTest.email",
      userTest.name,
      userTest.password
    ).catch((error: Error) =>
      expect(error.message).toMatch(ERROR_INVALID_EMAIL)
    );
  });
  test("throw an error when name is invalid", () => {
    expect.assertions(1);
    return createUser(
      userTest.email,
      "aze",
      userTest.password
    ).catch((error: Error) =>
      expect(error.message).toMatch(ERROR_INVALID_NAME)
    );
  });
  test("throw an error when password is invalid", () => {
    expect.assertions(1);
    return createUser(
      userTest.email,
      userTest.name,
      "passsxs"
    ).catch((error: Error) =>
      expect(error.message).toMatch(ERROR_INVALID_PASSWORD)
    );
  });
  describe("", () => {
    beforeEach(async () => {
      await createUser(userTest.email, userTest.name, userTest.password);
    });
    test("throw an error when user already exist", () => {
      expect.assertions(1);
      return createUser(userTest.email, userTest.name, userTest.password)
        .then((user) => console.log(user))
        .catch((error: Error) => {
          expect(error.message).toMatch(ERROR_ALREADY_USE);
        });
    });
  });
});
