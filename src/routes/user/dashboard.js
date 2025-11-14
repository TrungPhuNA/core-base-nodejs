import express from 'express'
import * as dashboardController from '../../controllers/user/dashboardController.js'

const router = express.Router()

/**
 * @swagger
 * /api/user/dashboard:
 *   get:
 *     tags: [User]
 *     summary: Get user dashboard data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get('/', dashboardController.getDashboard)

/**
 * @swagger
 * /api/user/dashboard/stats:
 *   get:
 *     tags: [User]
 *     summary: Get user statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics
 */
router.get('/stats', dashboardController.getStats)

export default router

