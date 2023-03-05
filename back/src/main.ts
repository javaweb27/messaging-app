import { Server as WebSocketIo } from "socket.io"
import { httpApp, expressApp } from "./app"
import { connectMongoDB } from "./connectMongoDB"
import { CORS_URL, PORT } from "./config"
import sockets, { WsIoServer } from "./sockets"

connectMongoDB(() => {
  // httpApp for listen and for socketio
  httpApp.listen(PORT, () => {
    console.log("\n")
    console.log(`express app is on http://localhost:${PORT}`)
  })
})
// expressApp for routes
expressApp.get("/", (cli, res) => {
  res.send("Messaging App")
})

//server:
//the first one is client emits
//the second one is server emits
export const io: WsIoServer = new WebSocketIo(httpApp, {
  cors: {
    origin: [CORS_URL],
  },
})

sockets(io)
