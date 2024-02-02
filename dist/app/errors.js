"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
const notFoundHandler = (_req, _res, next) => {
    const error = new CustomError('Resource not found', 404);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, _req, res, next) => {
    if ('status' in error) {
        return res.status(error.status).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong',
            status: error.status,
            error: error || '',
        });
    }
    return res.status(500).json({
        status: error.status,
        message: error.message,
        error: error,
    });
};
exports.errorHandler = errorHandler;
