import { SocketHandler } from "../sockets"
import GroupModel from "../models/GroupModel"
import { AuthJwtDecoded } from "../lib/createAuthJwt"

/**
 * controls when user want to join to a group
 */
export const sioLeaveGroup: SocketHandler = (io, socket) => {
  socket.on("front:leave-group", async groupId => {
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded
    const group = await GroupModel.findById(groupId)

    // group does not exist
    if (!group) {
      console.log("cannot join to a group that does not exist")
      return
    }

    group.members = group.members.filter(objId => {
      return objId.toString() !== decodedToken.payload._id
    })

    await group.save()

    // todo: notify to members when the ures leaves the group?
  })
}
