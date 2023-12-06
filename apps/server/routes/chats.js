import express from 'express'
import ChatsController from '../controllers/chats'

const chatsRouter = express.Router()

chatsRouter.get('/', ChatsController.all)

export default chatsRouter
