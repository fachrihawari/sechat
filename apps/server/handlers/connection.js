import { socketEvents } from '@sechat/shared'

const { DISCONNECTING, DISCONNECT, USER_DISCONNECTED, USER_LIST } = socketEvents

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
    io.emit(USER_LIST, users)
  }


  // Immediate invoke when new user connected
  updateUsers()

  // List of handlers
  function disconnecting() {
    socket.broadcast.emit(USER_DISCONNECTED, socket.id)
  }

  socket.on(DISCONNECTING, disconnecting)
  socket.on(DISCONNECT, updateUsers);
}


export default connectionHandler
