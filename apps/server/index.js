import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://192.168.100.67:5173",
      process.env.CLIENT_URL
    ]
  }
});
httpServer.listen(process.env.PORT || 3000);

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  updateUsers()

  socket.on("private-message", ({ content, to }) => {
    console.log("private-message", { content, to })
    socket.to(to).emit("private-message", {
      content,
      from: socket.id,
    });
  });

  socket.on("disconnecting", () => {
    socket.broadcast.emit("user-disconnected", socket.id)
  })

  socket.on("disconnect", () => {
    updateUsers()
  });
});


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