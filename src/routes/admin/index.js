import express from 'express'
import { authenticate } from '../../middleware/auth.js'
import { requireAdmin } from '../../middleware/roleCheck.js'
import usersRoutes from './users.js'
import dashboardRoutes from './dashboard.js'
import reportsRoutes from './reports.js'

const router = express.Router()

// Apply authentication and admin role check to all admin routes
router.use(authenticate, requireAdmin)

router.use('/users', usersRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/reports', reportsRoutes)

export default router

