import { instrument } from '@socket.io/admin-ui'

import authMiddleware from '../middlewares/auth.js'
import chatHandler from './chat.js'
import connectionHandler from './connection.js'

export default function handlers(io) {
  // Use middlewares
  io.use(authMiddleware);

  // Register all handlers
  function onConnection(socket) {
    chatHandler({ io, socket })
    connectionHandler({ io, socket })
  }
  io.on("connection", onConnection);

  // Attach socket.io admin
  instrument(io, {
    auth: false,
    readonly: true,
    mode: process.env.NODE_ENV || "development",
  });
}
