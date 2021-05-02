import { createUser } from "../../userServices";
import availableUser from "../../userServices/availableUser";
import userTestSetUp from "../userTestSetUp";

const userTest = {
  email: "amaury@mail.com",
  name: "username",
  password: "paskmc#1",
};

userTestSetUp();
describe("Check if available works as intended", () => {
  beforeEach(async () => {
    await createUser(userTest.email, userTest.name, userTest.password);
  });
  test("return true if no user with same identifier exists", async () => {
    const result = await availableUser("userTest.name");
    expect(result).toBeTruthy();
  });
  test("return false if user with same identifier exists", async () => {
    const result = await availableUser(userTest.name);
    expect(result).toBeFalsy();
  });
});
