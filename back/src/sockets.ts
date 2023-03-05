import { Server, Socket } from "socket.io"
import { verifyAuthJwt } from "./lib/createAuthJwt"
import * as socketsHandlers from "./socketsHandlers"
import { WsClientEmits } from "./WsClientEmits.interface"
import { WsServerEmits } from "./WsServerEmits.interface"
import { sioAddOnlineUser } from "./z-sockets/sioAddOnlineUser"

type WsIoSocket = Socket<WsClientEmits, WsServerEmits>

export type WsIoServer = Server<WsClientEmits, WsServerEmits>

export type SocketHandler = (io: WsIoServer, socket: WsIoSocket) => void

export type SocketHandlerAsync = (io: WsIoServer, socket: WsIoSocket) => Promise<void>

export default (io: WsIoServer) => {
  // middlewares
  io.use(async (socket, next) => {
    const bearer = socket.handshake.auth.token
    try {
      const jwt = bearer.split(" ")[1]
      socket.data.decodedToken = await verifyAuthJwt(jwt)
      next()
      console.log("auth token is ok")
    } catch (error: any) {
      console.log("auth token is invalid")

      next(new Error("wrong auth jwt"))
    }
  })

  io.on("connection", socket => {
    //when connect
    console.log("a user connected to socketio.")

    // debug
    // socket.onAny((eventName, ...args) => {
    //   console.log("\n------")
    //   console.log(`event tiggered: ${eventName}`)
    //   console.log("args:", args)
    //   console.log("\n")
    // })

    sioAddOnlineUser(io, socket).then(() => {
      for (const sioHandler of Object.values(socketsHandlers)) {
        sioHandler(io, socket)
      }
    })
  })
}
