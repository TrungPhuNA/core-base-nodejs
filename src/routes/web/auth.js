import express from 'express'
import * as authController from '../../controllers/web/authController.js'
import { validate } from '../../middleware/validate.js'
import { registerSchema, loginSchema } from '../../validators/authValidator.js'
import { authenticate } from '../../middleware/auth.js'

const router = express.Router()

/**
 * @swagger
 * /api/web/auth/register:
 *   post:
 *     tags: [Web - Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', validate(registerSchema), authController.register)

/**
 * @swagger
 * /api/web/auth/login:
 *   post:
 *     tags: [Web - Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), authController.login)

/**
 * @swagger
 * /api/web/auth/profile:
 *   get:
 *     tags: [Web - Auth]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/profile', authenticate, authController.getProfile)

export default router

