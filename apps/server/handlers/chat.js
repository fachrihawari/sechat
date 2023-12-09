import { socketEvents } from '@sechat/shared'

const { CHAT_NEW_MESSAGE } = socketEvents

function chatHandler({ socket, io }) {
  // List of handlers
  async function newMessage({ message, receiver }) {
    const receiverUserId = io.of("/").sockets.get(receiver).user._id

    // Move this
    socket.to(receiver).emit(CHAT_NEW_MESSAGE, {
      message: message,
      sender: {
        _id: socket.user._id
      },
      receiver: {
        _id: receiverUserId
      }
    });
  }

  socket.on(CHAT_NEW_MESSAGE, newMessage)
}

export default chatHandler
