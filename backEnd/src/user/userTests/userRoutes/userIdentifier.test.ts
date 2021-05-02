import request from "supertest";
import app from "../../../app";
import { errorStatusMessage } from "../../../error/errorHandler";
import { ERROR_MISSING_FILED } from "../../../error/errorMessage";

import { createUser } from "../../userServices";
import userTestSetUp from "../userTestSetUp";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};

userTestSetUp();
describe("Check if POST users/identifier/ works as intend", () => {
  beforeEach(async () => {
    await createUser(userTest.email, userTest.name, userTest.password);
  });
  test("Check if a name already used return false", async () => {
    const res = await request(app)
      .post("/api/users/identifier")
      .send({ identifier: userTest.name });
    expect(res.status).toEqual(200);
    expect(res.body.available).toBeFalsy();
  });
  test("Check if a name not used return true", async () => {
    const res = await request(app)
      .post("/api/users/identifier")
      .send({ identifier: "userTest.name" });
    expect(res.status).toEqual(200);
    expect(res.body.available).toBeTruthy();
  });
  test("Check if a bad request body throw an error", async () => {
    const res = await request(app).post("/api/users/identifier").send({});
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      error: errorStatusMessage(ERROR_MISSING_FILED).error,
    });
  });
});
