import { OnlineUsers } from "../z-sio-state/OnlineUsers"
import { SocketHandlerAsync } from "../sockets"
import GroupModel from "../models/GroupModel"
import { AuthJwtDecoded } from "../lib/createAuthJwt"

type Handler = SocketHandlerAsync

/**
 * adds a user to the online users list
 * with socketId, userId and email
 */
export const sioAddOnlineUser: Handler = async (io, socket) => {
  //take userId and socketId from user(when someone logs in)
  const { payload: userData } = socket.data.decodedToken as AuthJwtDecoded

  console.log("\ngetting all groups from db where the user is member")

  const groups = await GroupModel.find({ members: { $in: [userData._id] } }, { _id: 1 })

  console.log(`adding user to "online users" list`)

  OnlineUsers.add(userData._id, socket.id, userData.email)

  for (const g of groups) {
    socket.join(g._id.toString())
  }

  console.log("online users:", OnlineUsers.items.length)
  // console.table(OnlineUsers.items)
}
