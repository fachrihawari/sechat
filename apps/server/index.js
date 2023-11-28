import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import handlers from "./handlers"
import routes from './routes'
import corsConfig from './config/cors.js'

// Init http & socket server
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: corsConfig });

// Mount socket handlers
handlers(io)

// Mount http routes
app.use(routes)

// Listen the server
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/sechat"
const serverPort = process.env.PORT || 3000

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("DB connected")

    httpServer.listen(serverPort)
      .addListener("listening", () => {
        console.log(`Server running at ${serverPort}`)
      })
      .addListener('error', (err) => {
        console.log("Something wrong with the server")
        console.log(err) // TODO: integrate sentry or morgan logger
      })
  })
  .catch(err => {
    console.log("Something wrong with the DB")
    console.log(err) // TODO: integrate sentry or morgan logger
  })
