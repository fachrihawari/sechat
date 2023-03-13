import { socketEvents } from '@sechat/shared'

const { CHAT_NEW_MESSAGE } = socketEvents

function chatHandler({ socket }) {
  // List of handlers
  function newMessage({ content, to }) {
    console.log(CHAT_NEW_MESSAGE, { content, to });
    socket.to(to).emit(CHAT_NEW_MESSAGE, {
      content,
      from: socket.id,
    });
  }

  socket.on(CHAT_NEW_MESSAGE, newMessage)
}

export default chatHandler
