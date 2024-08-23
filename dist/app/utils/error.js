"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
const handleMongoValidationError_1 = __importDefault(require("./handleMongoValidationError"));
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const configs_1 = __importDefault(require("../configs"));
const multer_1 = __importDefault(require("multer"));
// error handler class
class ErrorHandler extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
// global error handler middleware
const handleError = (err, _req, res, _next) => {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err.name === "ValidationError") {
        const errors = (0, handleMongoValidationError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err.name === "CastError") {
        const errors = (0, handleCastError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err.code === 11000) {
        const errors = (0, handleDuplicateError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err instanceof ErrorHandler) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof multer_1.default.MulterError) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    console.log(err);
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
        stack: configs_1.default.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.handleError = handleError;
