import express from 'express'
import UsersController from '../controllers/users'

const usersRouter = express.Router()

usersRouter.get('/', UsersController.all)

export default usersRouter
