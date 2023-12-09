import Chat from "../models/chat"

export default class ChatsController {
  static async all(req, res, next) {
    try {
      const userId = req.user._id
      const oppositeId = req.params.id

      const chats = await Chat.find({
        $or: [
          { sender: userId, receiver: oppositeId },
          { receiver: userId, sender: oppositeId },
        ]
      }).populate('sender receiver')
      res.json(chats)
    } catch (error) {
      next(error)
    }
  }
  static async create(req, res, next) {
    try {
      const userId = req.user._id
      const oppositeId = req.params.id
      const { message } = req.body
      const chat = await Chat.create({
        message,
        sender: userId,
        receiver: oppositeId
      })
      res.json(chat)
    } catch (error) {
      next(error)
    }
  }
}
