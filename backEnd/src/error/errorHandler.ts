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
  switch (message) {
    case ERROR_MISSING_FILED:
      return { status: 400, errorMessage: "a field has not been filled" };
    case ERROR_INVALID_EMAIL:
      return { status: 400, errorMessage: "invalid email" };
    case ERROR_INVALID_NAME:
      return { status: 400, errorMessage: "invalid username" };
    case ERROR_INVALID_PASSWORD:
      return { status: 400, errorMessage: "invalid password" };
    case ERROR_ALREADY_USE:
      return { status: 400, errorMessage: "email / name already used" };
    case ERROR_BAD_EMAIL_NAME:
      return { status: 400, errorMessage: "unknown user" };
    case ERROR_BAD_PASSWORD:
      return { status: 400, errorMessage: "bad password" };
    case ERROR_CALL_DATABASE:
    default:
      return {
        status: 500,
        errorMessage: "something unexpected goes wrong retry later",
      };
  }
};

const errorHandler = (e: Error, res: Response) => {
  const { message } = e;
  const { status, errorMessage } = errorStatusMessage(message as ErrorMessage);
  res.status(status).send({ error: errorMessage });
};

export default errorHandler;
