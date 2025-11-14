import User from '../database/models/User.js'
import { ConflictError, UnauthorizedError, NotFoundError } from '../utils/errors.js'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js'
import { generateAccessToken, generateRefreshToken } from './tokenService.js'

export const register = async (userData) => {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: userData.email } })
    if (existingUser) {
        throw new ConflictError(ERROR_MESSAGES.EMAIL_EXISTS)
    }

    // Create user
    const user = await User.create(userData)

    // Generate tokens
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        user: user.toJSON(),
        accessToken,
        refreshToken,
    }
}

export const login = async (email, password) => {
    // Find user by email
    const user = await User.findOne({ where: { email } })
    if (!user) {
        throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS)
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
        throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS)
    }

    // Check if user is active
    if (user.status !== 'active') {
        throw new UnauthorizedError('Your account is inactive')
    }

    // Generate tokens
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        user: user.toJSON(),
        accessToken,
        refreshToken,
    }
}

export const getProfile = async (userId) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }
    return user.toJSON()
}

