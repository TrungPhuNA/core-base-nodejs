import User from '../../database/models/User.js'
import { successResponse } from '../../utils/response.js'
import { Op } from 'sequelize'

export const getUsersReport = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query

        const where = {}
        if (startDate && endDate) {
            where.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            }
        }

        const users = await User.findAll({
            where,
            order: [['createdAt', 'DESC']],
        })

        const report = {
            totalUsers: users.length,
            users: users.map((user) => user.toJSON()),
            generatedAt: new Date(),
        }

        return successResponse(res, report, 'Users report generated')
    } catch (error) {
        next(error)
    }
}

export const getActivityReport = async (req, res, next) => {
    try {
        // Placeholder for activity report
        const report = {
            totalActivities: 0,
            activitiesByType: {},
            generatedAt: new Date(),
        }

        return successResponse(res, report, 'Activity report generated')
    } catch (error) {
        next(error)
    }
}

