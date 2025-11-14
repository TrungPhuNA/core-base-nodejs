import Joi from 'joi'

export const updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(255).optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().allow(null, ''),
    dateOfBirth: Joi.date().optional().allow(null),
    gender: Joi.string().valid('male', 'female', 'other').optional().allow(null),
    address: Joi.string().max(500).optional().allow(null, ''),
    bio: Joi.string().max(1000).optional().allow(null, ''),
    avatar: Joi.string().uri().optional().allow(null, ''),
})

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Current password is required',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters',
        'any.required': 'New password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Confirm password must match new password',
        'any.required': 'Confirm password is required',
    }),
})

export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(255).required(),
    role: Joi.string().valid('user', 'admin').optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().allow(null, ''),
})

export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(255).optional(),
    role: Joi.string().valid('user', 'admin').optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().allow(null, ''),
    dateOfBirth: Joi.date().optional().allow(null),
    gender: Joi.string().valid('male', 'female', 'other').optional().allow(null),
    address: Joi.string().max(500).optional().allow(null, ''),
    bio: Joi.string().max(1000).optional().allow(null, ''),
})

export const getUsersQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().optional().allow(''),
    role: Joi.string().valid('user', 'admin', 'all').optional(),
    status: Joi.string().valid('active', 'inactive', 'all').optional(),
    sortBy: Joi.string().valid('createdAt', 'name', 'email').default('createdAt'),
    sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC'),
})

