import express from 'express'
import * as publicController from '../../controllers/web/publicController.js'

const router = express.Router()

/**
 * @swagger
 * /api/web/public/info:
 *   get:
 *     tags: [Web - Public]
 *     summary: Get app information
 *     responses:
 *       200:
 *         description: App information
 */
router.get('/info', publicController.getInfo)

/**
 * @swagger
 * /api/web/public/contact:
 *   get:
 *     tags: [Web - Public]
 *     summary: Get contact information
 *     responses:
 *       200:
 *         description: Contact information
 */
router.get('/contact', publicController.getContact)

export default router

