import request, { Response } from "supertest";
import app from "../../../app";
import { errorStatusMessage } from "../../../error/errorHandler";
import { ERROR_MISSING_FILED } from "../../../error/errorMessage";
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
    const res = await request(app).post("/api/users").send(userTest);
    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual(userTest.name);
    expect(res.body.email).toEqual(userTest.email);
    expect(res.body.token).toBeTruthy();
  });
  test("Check if a user with missing email throw an error", async () => {
    const res: Response = await request(app)
      .post("/api/users")
      .send(userMissingEmailTest);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      error: errorStatusMessage(ERROR_MISSING_FILED).error,
    });
  });
});
