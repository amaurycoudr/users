import { check } from "../../userUtils";
const checkersTested = [
  {
    check: "userName",
    checker: check.checkUserNameLength,
    cases: [
      { functionArgument: "aze", isValid: false, condition: "TOO SHORT" },
      {
        functionArgument: "aaaaaaaaaaaaaaaaaaaa",
        isValid: false,
        condition: "TOO SHORT",
      },
      { functionArgument: "amaury", isValid: true },
    ],
  },
  {
    check: "password",
    checker: check.checkUserPassword,
    cases: [
      { functionArgument: "aze", isValid: false, condition: "TOO SHORT" },
      { functionArgument: "azeazerA", isValid: false, condition: "STRENGTH=2" },
      {
        functionArgument: "azeazerdaf",
        isValid: false,
        condition: "STRENGTH=1",
      },
      { functionArgument: "azeazerd@1", isValid: true },
      { functionArgument: "AZEEFNK@1", isValid: true },
    ],
  },
  {
    check: "email",
    checker: check.checkUserEmail,
    cases: [
      { functionArgument: "aze@mail", isValid: false, condition: "BAD FORMAT" },
      { functionArgument: "amaury@mail.fr", isValid: true },
    ],
  },
];
checkersTested.map((checkerTested) => {
  const { cases, check, checker } = checkerTested;
  describe(`Check if ${check} checker works as intended`, () => {
    cases.map((value) => {
      const { isValid, condition, functionArgument } = value;
      test(`Check if ${functionArgument} is ${
        isValid ? "a valid" : "an invalid"
      } ${check} ${condition ? `(${condition})` : ""}`, () => {
        if (isValid) {
          expect(checker(functionArgument)).toBeTruthy();
        } else {
          expect(checker(functionArgument)).toBeFalsy();
        }
      });
    });
  });
});
