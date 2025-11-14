import { HTTP_STATUS } from '../config/constants.js'

export const successResponse = (res, data = null, message = 'Success', statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    })
}

export const errorResponse = (res, message = 'Error', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) => {
    const response = {
        success: false,
        message,
    }

    if (errors) {
        response.errors = errors
    }

    return res.status(statusCode).json(response)
}

export const paginatedResponse = (res, data, pagination, message = 'Success') => {
    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message,
        data,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            totalPages: Math.ceil(pagination.total / pagination.limit),
        },
    })
}

