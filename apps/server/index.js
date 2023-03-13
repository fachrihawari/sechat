import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import auth from './middlewares/auth.js'
import cors from './config/cors.js'
import chatHandler from './handlers/chat.js'
import connectionHandler from './handlers/connection.js'

// Init http server
const httpServer = createServer()

// Init socket.io server
const io = new Server(httpServer, { cors });

// Use middlewares
io.use(auth);

// Register all handlers
function onConnection(socket) {
  chatHandler({ io, socket })
  connectionHandler({ io, socket })
}
io.on("connection", onConnection);

// Listen the server
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/sechat"
const serverPort = process.env.PORT || 3000
mongoose.connect(mongoUrl)
  .then(() => {
    httpServer.listen(serverPort)
      .addListener('error', (err) => {
        console.log("Something wrong with the server!")
        console.log(err) // TODO: integrate sentry or morgan logger
      })
  })
  .catch(err => {
    console.log("Something wrong with the DB!")
    console.log(err) // TODO: integrate sentry or morgan logger
  })