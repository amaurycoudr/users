import { Response } from "express";
import {
  ErrorMessage,
  ERROR_ALREADY_USE,
  ERROR_BAD_EMAIL_NAME,
  ERROR_BAD_PASSWORD,
  ERROR_CALL_DATABASE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PASSWORD,
  ERROR_MISSING_FILED,
} from "./errorMessage";

const errorStatusMessage = (message: ErrorMessage) => {
  const errors = {
    [ERROR_MISSING_FILED]: {
      status: 400,
      errorMessage: "a field has not been filled",
    },
    [ERROR_INVALID_EMAIL]: { status: 400, errorMessage: "invalid email" },
    [ERROR_INVALID_NAME]: { status: 400, errorMessage: "invalid username" },
    [ERROR_INVALID_PASSWORD]: { status: 400, errorMessage: "invalid password" },
    [ERROR_ALREADY_USE]: {
      status: 400,
      errorMessage: "email / name already used",
    },
    [ERROR_BAD_EMAIL_NAME]: { status: 400, errorMessage: "unknown user" },
    [ERROR_BAD_PASSWORD]: { status: 400, errorMessage: "bad password" },
    [ERROR_CALL_DATABASE]: {
      status: 500,
      errorMessage: "something unexpected goes wrong retry later",
    },
  };
  return errors[message] || errors[ERROR_CALL_DATABASE];
};

const errorHandler = (e: Error, res: Response) => {
  const { message } = e;
  const { status, errorMessage } = errorStatusMessage(message as ErrorMessage);
  res.status(status).send({ error: errorMessage });
};

export default errorHandler;
