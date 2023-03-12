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
httpServer.listen(3000);

let activeUsers = []

io.on("connection", (socket) => {
  activeUsers.push(socket.id)

  // Send new active ids
  io.emit("active-ids", activeUsers)

  socket.on("disconnecting", () => {
    console.log(socket.id, " disconnected"); // the Set contains at least the socket ID
    // Delete id from active users
    activeUsers = activeUsers.filter(id => id !== socket.id)
  });
});