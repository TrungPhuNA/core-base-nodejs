import { ForbiddenError } from '../utils/errors.js'
import { ERROR_MESSAGES, USER_ROLES } from '../config/constants.js'

export const requireRole = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN)
            }

            if (!roles.includes(req.user.role)) {
                throw new ForbiddenError('You do not have permission to access this resource')
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

export const requireAdmin = requireRole(USER_ROLES.ADMIN)
export const requireUser = requireRole(USER_ROLES.USER, USER_ROLES.ADMIN)

