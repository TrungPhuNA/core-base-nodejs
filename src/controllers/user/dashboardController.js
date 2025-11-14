import * as userService from '../../services/userService.js'
import { successResponse } from '../../utils/response.js'

export const getDashboard = async (req, res, next) => {
    try {
        const stats = await userService.getDashboardStats(req.user.id)
        return successResponse(res, stats, 'Dashboard data')
    } catch (error) {
        next(error)
    }
}

export const getStats = async (req, res, next) => {
    try {
        // Placeholder for user stats
        const stats = {
            totalActivities: 0,
            completedTasks: 0,
            pendingTasks: 0,
        }
        return successResponse(res, stats, 'User statistics')
    } catch (error) {
        next(error)
    }
}

