import express from 'express'
import webRoutes from './web/index.js'
import userRoutes from './user/index.js'
import adminRoutes from './admin/index.js'

const router = express.Router()

// Mount routes
router.use('/web', webRoutes)
router.use('/user', userRoutes)
router.use('/admin', adminRoutes)

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    })
})

export default router

