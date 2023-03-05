import { SocketHandler } from "../sockets"
import GroupModel from "../models/GroupModel"
import { AuthJwtDecoded } from "../lib/createAuthJwt"

/**
 * controls when user cancels its request to join a group
 */
export const sioCancelJoinRequest: SocketHandler = (io, socket) => {
  socket.on("front:cancel-join-request", async groupId => {
    console.log("\n------")
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded

    const group = await GroupModel.findById(groupId)

    // group does not exist
    if (!group) {
      console.log("cannot cancel a join request for a group that does not exist")
      return
    }

    group.requests = group.requests.filter(userObjId => {
      return userObjId.toString() !== decodedToken.payload._id
    })

    await group.save()
    console.log(`a user no longer want to join a group`)
    console.log(`request has been canceled`)
    console.log(`user: (${decodedToken.payload.email}): ${decodedToken.payload._id}`)
    console.log(`group: (${group.name}): ${group._id}`)
  })
}
