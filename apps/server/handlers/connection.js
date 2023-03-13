function connectionHandler({ io, socket }) {
  // Update user list
  function updateUsers() {
    let users = []
    for (let [id, socketItem] of io.of("/").sockets) {
      users.push({
        id,
        username: socketItem.username,
      });
    }
    // Send new online ids
    io.emit("users", users)
  }


  // Immediate invoke when new user connected
  updateUsers()

  // List of handlers
  function disconnecting() {
    socket.broadcast.emit("connection:user-disconnected", socket.id)
  }

  socket.on("disconnecting", disconnecting)
  socket.on("disconnect", updateUsers);
}


export default connectionHandler