// import { Types } from "mongoose"
import { AuthJwtDecoded } from "../lib/createAuthJwt"
import GroupModel from "../models/GroupModel"
import { SocketHandler } from "../sockets"

/**
 * controls when an admin accepts the request of a user that wants to join a group of admin
 */
export const sioRejectRequest: SocketHandler = (io, socket) => {
  // admin accepts a request
  socket.on("front:reject-request", async data => {
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded

    console.log("\n------")
    console.log("admin rejecting a join request")

    const group = await GroupModel.findById(data.groupId)

    if (!group) {
      console.log("cannot reject a request for a group that does not exist")
      return
    }

    // reject if the emiter user isn't an admin
    if (group.ownerUserId.toString() !== decodedToken.payload._id) {
      console.log("\n------")
      console.log("403, rejected, only admin can reject a request")
      return
    }

    let isRequestActive = false

    // removing request
    group.requests = group.requests.filter(objId => {
      if (objId.toString() !== data.userId) {
        return true
      }

      // userId found
      isRequestActive = true
      return false
    })

    if (isRequestActive === false) {
      console.log("this request does not exist, couldn't reject")
      return
    }

    // updating db (the request is already removed)
    await group.save()

    console.log("a request has been rejected (removed)")
  })
}
