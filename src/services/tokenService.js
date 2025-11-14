import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    })
}

export const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
    }

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET)
}

