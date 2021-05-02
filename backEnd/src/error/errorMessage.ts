export const ERROR_MISSING_FILED = "missing_filed";
export const ERROR_BAD_TOKEN = "bad_token";
export const ERROR_INVALID_EMAIL = "invalid_email";
export const ERROR_INVALID_NAME = "invalid_name";
export const ERROR_INVALID_PASSWORD = "invalid_password";
export const ERROR_ALREADY_USE = "already_use";
export const ERROR_UNEXPECTED = "error_call_database";
export const ERROR_BAD_EMAIL_NAME = "error_bad_email_name";
export const ERROR_BAD_PASSWORD = "error_bad_password";

export type ErrorType =
  | typeof ERROR_MISSING_FILED
  | typeof ERROR_INVALID_NAME
  | typeof ERROR_INVALID_EMAIL
  | typeof ERROR_INVALID_PASSWORD
  | typeof ERROR_ALREADY_USE
  | typeof ERROR_UNEXPECTED
  | typeof ERROR_BAD_PASSWORD
  | typeof ERROR_BAD_TOKEN
  | typeof ERROR_BAD_EMAIL_NAME;
