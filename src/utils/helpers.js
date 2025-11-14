export const excludeFields = (obj, fields) => {
    const newObj = { ...obj }
    fields.forEach((field) => delete newObj[field])
    return newObj
}

export const pickFields = (obj, fields) => {
    const newObj = {}
    fields.forEach((field) => {
        if (obj[field] !== undefined) {
            newObj[field] = obj[field]
        }
    })
    return newObj
}

export const generateRandomString = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

