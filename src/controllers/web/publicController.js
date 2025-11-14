import { successResponse } from '../../utils/response.js'

export const getInfo = async (req, res, next) => {
    try {
        const info = {
            appName: 'BE API',
            version: '1.0.0',
            description: 'Backend API with Node.js + Express + MySQL',
        }
        return successResponse(res, info, 'App information')
    } catch (error) {
        next(error)
    }
}

export const getContact = async (req, res, next) => {
    try {
        const contact = {
            email: 'support@example.com',
            phone: '+84 123 456 789',
            address: '123 Street, City, Country',
        }
        return successResponse(res, contact, 'Contact information')
    } catch (error) {
        next(error)
    }
}

