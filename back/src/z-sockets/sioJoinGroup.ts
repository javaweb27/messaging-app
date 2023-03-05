import { SocketHandler } from "../sockets"
import { OnlineUsers } from "../z-sio-state/OnlineUsers"
import GroupModel from "../models/GroupModel"
import { Types } from "mongoose"
import { AuthJwtDecoded } from "../lib/createAuthJwt"

/**
 * controls when a user wants to join to a group
 */
export const sioJoinGroup: SocketHandler = (io, socket) => {
  socket.on("front:join-group", async groupId => {
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded

    const group = await GroupModel.findById(groupId)

    // group does not exist
    if (!group) {
      console.log("cannot join to a group that does not exist")
      return
    }

    // check if userId is already in member list of the group
    const isMember = group.members.includes(new Types.ObjectId(decodedToken.payload._id))

    if (isMember) {
      console.log(`this user is already a member of ${group.name}`)
      // console.log(`userId: ${decodedToken.payload._id}`)
      // console.log(`userNickname: ${decodedToken.payload.email}`)
      return
    }

    // user join the group when request isn't necessary
    if (group.requestToJoin === false) {
      // console.log(
      //   `${decodedToken.payload.email} is joining to group ${group.name}`
      // )
      group.members.push(new Types.ObjectId(decodedToken.payload._id))
      await group.save()
      socket.join(group.id)
      io.to(group.id).emit("back:user-joins-group", {
        groupName: group.name,
        groupId: group._id.toString(),
        userId: decodedToken.payload._id,
      })
      return
    }

    // check if the request to join already exists
    const requestAleadyExists = group.requests.some(
      objId => objId.toString() === decodedToken.payload._id
    )

    // stop when request already exists
    if (requestAleadyExists) {
      console.log(`request to join to ${group.name} group already exists`)
      // console.log(`userId: ${decodedToken.payload._id}`)
      // console.log(`userNickname: ${decodedToken.payload.email}`)
      return
    }

    // adding userId to request list of the group
    group.requests.push(new Types.ObjectId(decodedToken.payload._id))
    await group.save()

    console.log("request has been added to the requests list")

    // notify to the admin that there is an request
    const admin = OnlineUsers.get(group.ownerUserId.toString()) // online ures

    // admin isn't online
    // but it will receive all request when it is online back
    if (!admin) {
      console.log("admin isn't online but it will receive all request when it is online")
      return
    }

    console.log(`sending new request to admin ${admin.email}:${admin.userId}`)
  })
}
