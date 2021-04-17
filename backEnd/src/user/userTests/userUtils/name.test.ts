import { name } from "../../userUtils";

describe("Check if createRandomUserName works as intend", () => {
  test("Check is function return a string which starts with player", () => {
    expect(name.createRandomUserName()).toContain("player");
  });
  test("Check is function return a length 15 string ", () => {
    expect(name.createRandomUserName().length).toBe(15);
  });
});
describe("Check if reformatUserName works as intend", () => {
  const userName0 = "amaury";
  test(`Check is function return ${userName0} if the argument is ${userName0}`, () => {
    expect(name.reformatUserName(userName0)).toBe(userName0);
  });
  const userName1 = `    ${userName0}    `;
  test(`Check is function return ${userName0} if the argument is ${userName1}`, () => {
    expect(name.reformatUserName(userName1)).toBe(userName0);
  });
});
