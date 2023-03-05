import { Types } from "mongoose"
import { AuthJwtDecoded } from "../lib/createAuthJwt"
import GroupModel from "../models/GroupModel"
import { SocketHandler } from "../sockets"
import { OnlineUsers } from "../z-sio-state/OnlineUsers"

/**
 * controls when an admin accepts the request of a user that wants to join a group of admin
 */
export const sioAcceptRequest: SocketHandler = (io, socket) => {
  // require auth token before accept?
  // so only admin can accept the request
  // at least someone eles steal token

  // admin accepts a request
  socket.on("front:accept-request", async data => {
    console.log("\n------")
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded

    const group = await GroupModel.findById(data.groupId)

    if (!group) {
      console.log("cannot accept a request for a group that does not exist")
      return
    }

    // reject if the user isn't admin
    if (group.ownerUserId.toString() !== decodedToken.payload._id) {
      console.log("\n------")
      console.log("403, rejected, only admin can accept a request")

      return
    }

    // removing userId from requests list
    // and checking is userId is in request list

    let isRequestActive = false

    group.requests = group.requests.filter(objId => {
      if (objId.toString() !== data.userId) {
        return true
      }

      // userId found
      isRequestActive = true
      return false
    })

    if (isRequestActive === false) {
      console.log("cannot accept a request that does no exist")
      return
    }

    // adding userId to members list
    group.members.push(new Types.ObjectId(data.userId))

    await group.save()

    console.log("a request has been accepted")

    // all current members receive a message that a user has joined the group
    io.to(group.id).emit("back:user-joins-group", {
      userId: data.userId,
      groupId: group.id,
      groupName: group.name,
    })

    const newMember = OnlineUsers.get(data.userId)

    if (!newMember) {
      console.log(
        "new member isn't online but it will be listening the messages when it is online again"
      )
      return
    }
    // if the user is online, send a notification

    console.log("emiting to online user")
    socket.to(newMember.socketId).emit("back:my-request-accepted", {
      id: group._id.toString(),
      members: [],
      name: group.name,
      ownerUserId: group.ownerUserId.toString(),
      requestToJoin: group.requestToJoin,
    })
    // io.in(data.userId).socketsJoin(group.id)
  })

  // client emits this when its request was accepted while it was online
  socket.on("front:my-request-accepted", groupId => {
    // check if the user is a member in the group before join
    socket.join(groupId)
  })
}
