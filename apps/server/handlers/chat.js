import { socketEvents } from '@sechat/shared'
import Chat from '../models/chat'

const { CHAT_NEW_MESSAGE } = socketEvents

function chatHandler({ socket, io }) {
  // List of handlers
  async function newMessage({ content, receiver }) {
    const receiverSocketId = receiver
    const receiverUserId = io.of("/").sockets.get(receiver).user._id

    await Chat.create({
      message: content,
      sender: socket.user._id,
      receiver: receiverUserId,
    });
    socket.to(receiver).emit(CHAT_NEW_MESSAGE, {
      content,
      senderSocketId: socket.id,
      senderUserId: socket.user._id,
      receiverSocketId,
      receiverUserId
    });
  }

  socket.on(CHAT_NEW_MESSAGE, newMessage)
}

export default chatHandler
