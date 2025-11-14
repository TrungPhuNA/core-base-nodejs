import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../utils/errors.js'
import { ERROR_MESSAGES } from '../config/constants.js'
import User from '../database/models/User.js'

export const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED)
        }

        const token = authHeader.substring(7) // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Get user from database
        const user = await User.findByPk(decoded.id)
        if (!user) {
            throw new UnauthorizedError(ERROR_MESSAGES.USER_NOT_FOUND)
        }

        // Check if user is active
        if (user.status !== 'active') {
            throw new UnauthorizedError('User account is inactive')
        }

        // Attach user to request
        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findByPk(decoded.id)
            if (user && user.status === 'active') {
                req.user = user
            }
        }
        next()
    } catch (error) {
        // Ignore errors for optional auth
        next()
    }
}

