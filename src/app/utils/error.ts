import { ErrorRequestHandler } from "express";

import handleMongooseErrors from "./handleMongoValidationError";
import handleCastErrors from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import configs from "../configs";
import multer from "multer";

export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSource?: TErrorSource;
};

// error handler class
export class ErrorHandler extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// global error handler middleware
export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {  
  let message: string = err.message || "Internal Server Error";
  let statusCode: number = err.statusCode || 500;

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

 if (err.name === "ValidationError") {
    const errors = handleMongooseErrors(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err.name === "CastError") {
    const errors = handleCastErrors(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err.code === 11000) {
    const errors = handleDuplicateError(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof multer.MulterError) {   
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

console.log(err)
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSource,
    stack: configs.NODE_ENV === "development" ? err.stack : null,
  });
};
