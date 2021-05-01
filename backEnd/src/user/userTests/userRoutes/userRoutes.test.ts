import request, { Response } from "supertest";
import app from "../../../app";
import { errorStatusMessage } from "../../../error/errorHandler";
import {
  ERROR_BAD_PASSWORD,
  ERROR_MISSING_FILED,
} from "../../../error/errorMessage";
import { createUser } from "../../userServices";
import userTestSetUp from "../userTestSetUp";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};
const userMissingEmailTest = {
  name: "username",
  password: "paskmc#1",
};
userTestSetUp();
describe("Check if POST users/ works as intend", () => {
  test("Check if a user with good arguments is created", async () => {
    expect.assertions(4);
    try {
      const res = await request(app).post("/api/users").send(userTest);
      expect(res.status).toEqual(201);
      expect(res.body.name).toEqual(userTest.name);
      expect(res.body.email).toEqual(userTest.email);
      expect(res.body.token).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });
  test("Check if a user with missing email throw an error", async () => {
    expect.assertions(2);
    try {
      const res: Response = await request(app)
        .post("/api/users")
        .send(userMissingEmailTest);
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        error: errorStatusMessage(ERROR_MISSING_FILED).error,
      });
    } catch (error) {
      console.log(error);
    }
  });
});
describe("Check if POST users/login/ works as intend", () => {
  beforeEach(async () => {
    await createUser(userTest.email, userTest.name, userTest.password);
  });
  test("Check if a good identifer/password return token", async () => {
    expect.assertions(2);
    try {
      const res = await request(app)
        .post("/api/users/login")
        .send({ identifier: userTest.name, password: userTest.password });
      expect(res.status).toEqual(200);
      expect(res.body.token).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });
  test("Check if a user with missing email throw an error", async () => {
    expect.assertions(2);
    try {
      const res = await request(app)
        .post("/api/users/login")
        .send({ identifier: userTest.name, password: "userTest.password" });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        error: errorStatusMessage(ERROR_BAD_PASSWORD).error,
      });
    } catch (error) {
      console.log(error);
    }
  });
});
