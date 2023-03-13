function chatHandler({ socket }) {
  // List of handlers
  function newMessage({ content, to }) {
    console.log("chat:new-message", { content, to });
    socket.to(to).emit("chat:new-message", {
      content,
      from: socket.id,
    });
  }

  socket.on('chat:new-message', newMessage)
}

export default chatHandler