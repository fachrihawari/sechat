import express from 'express'
import cors from "cors";
import authRouter from './auth'
import corsConfig from '../config/cors';
import errorHandler from '../middlewares/errorHandler';

const router = express.Router()

// Slow down the server
router.use(async (req, res, next) => {
    await Bun.sleep(200)
    next()
})

// CORS
router.use(cors(corsConfig))

// Body Parser
router.use(express.json())

// Root Endpoint
router.get('/', (_, res) => res.json({ message: "Hello world!" }))

// Auth Endpoint
router.use(authRouter)

// Error Handler
router.use(errorHandler)

export default router
