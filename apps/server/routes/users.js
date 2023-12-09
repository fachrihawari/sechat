import express from 'express'
import UsersController from '../controllers/users'
import ChatsController from '../controllers/chats'

const usersRouter = express.Router()

usersRouter.get('/', UsersController.all)

usersRouter.get('/:id/chats', ChatsController.all)
usersRouter.post('/:id/chats', ChatsController.create)

export default usersRouter
