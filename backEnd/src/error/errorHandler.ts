import { Response } from "express";
import {
  ErrorType,
  ERROR_ALREADY_USE,
  ERROR_BAD_EMAIL_NAME,
  ERROR_BAD_PASSWORD,
  ERROR_CALL_DATABASE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
} from "./errorMessage";

export const errorStatusMessage = (message: ErrorType) => {
  const errors = {
    [ERROR_MISSING_FILED]: {
      status: 400,
      error: "a field has not been filled",
    },
    [ERROR_INVALID_EMAIL]: { status: 400, error: "invalid email" },
    [ERROR_INVALID_NAME]: { status: 400, error: "invalid username" },
    [ERROR_INVALID_PASSWORD]: { status: 400, error: "invalid password" },
    [ERROR_ALREADY_USE]: {
      status: 400,
      error: "email / name already used",
    },
    [ERROR_BAD_EMAIL_NAME]: { status: 400, error: "unknown user" },
    [ERROR_BAD_PASSWORD]: { status: 400, error: "bad password" },
    [ERROR_CALL_DATABASE]: {
      status: 500,
      error: "something unexpected goes wrong retry later",
    },
  };
  return errors[message] || errors[ERROR_CALL_DATABASE];
};

const errorHandler = (e: Error, res: Response) => {
  const { message } = e;
  const { status, error } = errorStatusMessage(message as ErrorType);
  res.status(status).send({ error });
};

export default errorHandler;
