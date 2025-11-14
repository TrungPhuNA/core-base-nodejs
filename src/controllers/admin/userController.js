import * as userService from '../../services/userService.js'
import { successResponse, paginatedResponse } from '../../utils/response.js'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../../config/constants.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers(req.query)
        return paginatedResponse(res, result.users, result.pagination, 'Users retrieved successfully')
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id)
        return successResponse(res, user)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        return successResponse(res, user, SUCCESS_MESSAGES.CREATE_SUCCESS, HTTP_STATUS.CREATED)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body)
        return successResponse(res, user, SUCCESS_MESSAGES.UPDATE_SUCCESS)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id)
        return successResponse(res, result, SUCCESS_MESSAGES.DELETE_SUCCESS)
    } catch (error) {
        next(error)
    }
}

