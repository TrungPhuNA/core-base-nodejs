import * as userService from '../../services/userService.js'
import { successResponse } from '../../utils/response.js'
import { SUCCESS_MESSAGES } from '../../config/constants.js'

export const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id)
        return successResponse(res, user)
    } catch (error) {
        next(error)
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const user = await userService.updateProfile(req.user.id, req.body)
        return successResponse(res, user, SUCCESS_MESSAGES.UPDATE_SUCCESS)
    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body
        const result = await userService.changePassword(req.user.id, currentPassword, newPassword)
        return successResponse(res, result, 'Password changed successfully')
    } catch (error) {
        next(error)
    }
}

