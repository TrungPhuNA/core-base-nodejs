import { HTTP_STATUS } from '../config/constants.js'

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation Error', errors = []) {
        super(message, HTTP_STATUS.BAD_REQUEST)
        this.errors = errors
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, HTTP_STATUS.UNAUTHORIZED)
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, HTTP_STATUS.FORBIDDEN)
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, HTTP_STATUS.NOT_FOUND)
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict') {
        super(message, HTTP_STATUS.CONFLICT)
    }
}

