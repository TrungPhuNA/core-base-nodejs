import User from '../../database/models/User.js'
import { successResponse } from '../../utils/response.js'
import { USER_ROLES, USER_STATUS } from '../../config/constants.js'

export const getDashboard = async (req, res, next) => {
    try {
        // Get total users
        const totalUsers = await User.count()

        // Get users by role
        const totalAdmins = await User.count({ where: { role: USER_ROLES.ADMIN } })
        const totalRegularUsers = await User.count({ where: { role: USER_ROLES.USER } })

        // Get users by status
        const activeUsers = await User.count({ where: { status: USER_STATUS.ACTIVE } })
        const inactiveUsers = await User.count({ where: { status: USER_STATUS.INACTIVE } })

        // Get recent users
        const recentUsers = await User.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
        })

        const stats = {
            totalUsers,
            totalAdmins,
            totalRegularUsers,
            activeUsers,
            inactiveUsers,
            recentUsers: recentUsers.map((user) => user.toJSON()),
        }

        return successResponse(res, stats, 'Admin dashboard data')
    } catch (error) {
        next(error)
    }
}

