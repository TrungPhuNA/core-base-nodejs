import express from 'express'
import authRoutes from './auth.js'
import publicRoutes from './public.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/public', publicRoutes)

export default router

