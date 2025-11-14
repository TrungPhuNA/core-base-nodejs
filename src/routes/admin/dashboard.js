import express from 'express'
import * as dashboardController from '../../controllers/admin/dashboardController.js'

const router = express.Router()

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin dashboard data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
 */
router.get('/', dashboardController.getDashboard)

export default router

