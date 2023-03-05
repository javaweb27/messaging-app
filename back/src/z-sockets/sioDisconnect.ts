import { OnlineUsers } from "../z-sio-state/OnlineUsers"
import { SocketHandler } from "../sockets"

export const sioDisconnect: SocketHandler = (io, socket) => {
  //when disconnect
  socket.on("disconnect", () => {
    console.log("\na user disconnected!")
    OnlineUsers.remove(socket.id)

    console.log("\n------")
    console.log(`current online users: ${OnlineUsers.items.length}`)
    // console.table(OnlineUsers.items)
    console.log("\n")
  })
}
