import { io, Socket } from "socket.io-client"
import { NODE_API } from "./config"

//these interfaces has been copied from backend source code
import { WsClientEmits } from "./WsClientEmits.interface"
import { WsServerEmits } from "./WsServerEmits.interface"

export type { WsClientEmits, WsServerEmits }

export const socket: Socket<WsServerEmits, WsClientEmits> = io(NODE_API, {
  autoConnect: true,
  auth: cb => {
    cb({ token: "bearer " + sessionStorage.getItem("authJwt") })
  },
})
