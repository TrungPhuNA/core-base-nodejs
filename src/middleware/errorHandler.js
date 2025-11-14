import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js'
import { errorResponse } from '../utils/response.js'
import { AppError, ValidationError } from '../utils/errors.js'

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    let message = err.message || ERROR_MESSAGES.INTERNAL_ERROR

    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err)
    }

    // Sequelize validation error
    if (err.name === 'SequelizeValidationError') {
        statusCode = HTTP_STATUS.BAD_REQUEST
        message = ERROR_MESSAGES.VALIDATION_ERROR
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }))
        return errorResponse(res, message, statusCode, errors)
    }

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = HTTP_STATUS.CONFLICT
        message = 'Resource already exists'
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }))
        return errorResponse(res, message, statusCode, errors)
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = HTTP_STATUS.UNAUTHORIZED
        message = ERROR_MESSAGES.INVALID_TOKEN
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = HTTP_STATUS.UNAUTHORIZED
        message = 'Token expired'
    }

    // Validation error with custom errors array
    if (err instanceof ValidationError) {
        return errorResponse(res, message, statusCode, err.errors)
    }

    // Operational errors
    if (err instanceof AppError) {
        return errorResponse(res, message, statusCode)
    }

    // Default error response
    return errorResponse(
        res,
        process.env.NODE_ENV === 'development' ? message : ERROR_MESSAGES.INTERNAL_ERROR,
        statusCode
    )
}

export const notFoundHandler = (req, res, next) => {
    return errorResponse(res, `Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND)
}

