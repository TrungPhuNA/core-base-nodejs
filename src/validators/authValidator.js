import Joi from 'joi'

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    name: Joi.string().min(2).max(255).required().messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must not exceed 255 characters',
        'any.required': 'Name is required',
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone must be a valid phone number (10-15 digits)',
    }),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
})

