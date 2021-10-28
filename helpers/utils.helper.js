const utils = {};
class AppError extends Error {
  constructor(statusCode, msg, errorType) {
    super(msg);
    this.statusCode = statusCode;
    this.errorType = errorType;
    Error.captureStackTrace(this, this.constructor);
  }
}

utils.AppError = AppError;

export default utils;
