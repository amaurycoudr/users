import { Response } from "express";
import {
  ErrorType,
  ERROR_ALREADY_USE,
  ERROR_BAD_EMAIL_NAME,
  ERROR_BAD_PASSWORD,
  ERROR_UNEXPECTED,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
  ERROR_BAD_TOKEN,
} from "./errorMessage";

export const errorStatusMessage = (message: ErrorType) => {
  const errors = {
    [ERROR_MISSING_FILED]: {
      status: 400,
      error: "fieldNotFilled",
    },
    [ERROR_INVALID_EMAIL]: { status: 400, error: "invalidEmail" },
    [ERROR_INVALID_NAME]: { status: 400, error: "invalidUsername" },
    [ERROR_INVALID_PASSWORD]: { status: 400, error: "invalidPassword" },
    [ERROR_ALREADY_USE]: {
      status: 400,
      error: "identifierAlreadyUsed",
    },
    [ERROR_BAD_EMAIL_NAME]: { status: 404, error: "unknownUser" },
    [ERROR_BAD_PASSWORD]: { status: 400, error: "badPassword" },
    [ERROR_UNEXPECTED]: {
      status: 500,
      error: "Unexpected",
    },
    [ERROR_BAD_TOKEN]: { status: 404, error: "badToken" },
  };
  return errors[message] || errors[ERROR_UNEXPECTED];
};

const errorHandler = (e: Error, res: Response) => {
  const { message } = e;
  const { status, error } = errorStatusMessage(message as ErrorType);
  res.status(status).send({ error });
};

export default errorHandler;
