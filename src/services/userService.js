import User from '../database/models/User.js'
import { NotFoundError, UnauthorizedError, ConflictError } from '../utils/errors.js'
import { ERROR_MESSAGES } from '../config/constants.js'
import { Op } from 'sequelize'

export const updateProfile = async (userId, updateData) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }

    await user.update(updateData)
    return user.toJSON()
}

export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword)
    if (!isPasswordValid) {
        throw new UnauthorizedError('Current password is incorrect')
    }

    // Update password
    user.password = newPassword
    await user.save()

    return { message: 'Password changed successfully' }
}

export const getAllUsers = async (filters = {}) => {
    const { page = 1, limit = 10, search = '', role, status, sortBy = 'createdAt', sortOrder = 'DESC' } = filters

    const where = {}

    // Search filter
    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
        ]
    }

    // Role filter
    if (role && role !== 'all') {
        where.role = role
    }

    // Status filter
    if (status && status !== 'all') {
        where.status = status
    }

    const offset = (page - 1) * limit

    const { count, rows } = await User.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder]],
    })

    return {
        users: rows.map((user) => user.toJSON()),
        pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
        },
    }
}

export const getUserById = async (userId) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }
    return user.toJSON()
}

export const createUser = async (userData) => {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: userData.email } })
    if (existingUser) {
        throw new ConflictError(ERROR_MESSAGES.EMAIL_EXISTS)
    }

    const user = await User.create(userData)
    return user.toJSON()
}

export const updateUser = async (userId, updateData) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }

    // If email is being updated, check if it already exists
    if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ where: { email: updateData.email } })
        if (existingUser) {
            throw new ConflictError(ERROR_MESSAGES.EMAIL_EXISTS)
        }
    }

    await user.update(updateData)
    return user.toJSON()
}

export const deleteUser = async (userId) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }

    await user.destroy()
    return { message: 'User deleted successfully' }
}

export const getDashboardStats = async (userId) => {
    // This is a placeholder - implement your actual dashboard logic
    const user = await User.findByPk(userId)
    if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
    }

    return {
        user: user.toJSON(),
        stats: {
            totalLogins: 0,
            lastLogin: new Date(),
            accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)),
        },
    }
}

