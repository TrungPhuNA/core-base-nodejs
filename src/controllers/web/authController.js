import * as authService from '../../services/authService.js'
import { successResponse } from '../../utils/response.js'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../../config/constants.js'

export const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)
        return successResponse(
            res,
            result,
            SUCCESS_MESSAGES.REGISTER_SUCCESS,
            HTTP_STATUS.CREATED
        )
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const result = await authService.login(email, password)
        return successResponse(res, result, SUCCESS_MESSAGES.LOGIN_SUCCESS)
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.id)
        return successResponse(res, user)
    } catch (error) {
        next(error)
    }
}

