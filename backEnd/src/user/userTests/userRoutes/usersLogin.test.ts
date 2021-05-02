import request from "supertest";
import app from "../../../app";
import { errorStatusMessage } from "../../../error/errorHandler";
import { ERROR_BAD_PASSWORD } from "../../../error/errorMessage";
import { createUser } from "../../userServices";
import userTestSetUp from "../userTestSetUp";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};

userTestSetUp();
describe("Check if POST users/login/ works as intend", () => {
  beforeEach(async () => {
    await createUser(userTest.email, userTest.name, userTest.password);
  });
  test("Check if a good identifer/password return token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ identifier: userTest.name, password: userTest.password });
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeTruthy();
  });
  test("Check if a user with missing email throw an error", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ identifier: userTest.name, password: "userTest.password" });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      error: errorStatusMessage(ERROR_BAD_PASSWORD).error,
    });
  });
});
