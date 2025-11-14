import express from 'express'
import * as reportController from '../../controllers/admin/reportController.js'

const router = express.Router()

/**
 * @swagger
 * /api/admin/reports/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get users report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Users report
 */
router.get('/users', reportController.getUsersReport)

/**
 * @swagger
 * /api/admin/reports/activity:
 *   get:
 *     tags: [Admin]
 *     summary: Get activity report
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity report
 */
router.get('/activity', reportController.getActivityReport)

export default router

