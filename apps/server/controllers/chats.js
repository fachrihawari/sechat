import Chat from "../models/chat"

export default class ChatsController {
  static async all(req, res) {
    try {
      const chats = await Chat.find({
        $or: [
          { sender: req.user._id, receiver: req.params.oppositeUserId },
          { receiver: req.user._id, sender: req.params.oppositeUserId },
        ]
      }).populate('sender receiver')
      res.json(chats)
    } catch (error) {
      next(error)
    }
  }
}
