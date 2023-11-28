import express from 'express'
import AuthController from '../controllers/auth'


const authRouter = express.Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/verify', AuthController.verify)

export default authRouter
