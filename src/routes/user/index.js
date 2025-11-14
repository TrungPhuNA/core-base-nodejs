import express from 'express'
import { authenticate } from '../../middleware/auth.js'
import { requireUser } from '../../middleware/roleCheck.js'
import profileRoutes from './profile.js'
import dashboardRoutes from './dashboard.js'

const router = express.Router()

// Apply authentication and role check to all user routes
router.use(authenticate, requireUser)

router.use('/profile', profileRoutes)
router.use('/dashboard', dashboardRoutes)

export default router

