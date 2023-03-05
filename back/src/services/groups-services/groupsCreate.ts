import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { io } from "../../main"
import GroupModel from "../../models/GroupModel"
import { OnlineUsers } from "../../z-sio-state/OnlineUsers"

export async function groupsCreate(
  decodedToken: AuthJwtDecoded,
  reqBody: Record<string, string>
) {
  const { name, requestToJoin } = reqBody

  //creating group
  console.log("creating group in db")
  const newGroup = new GroupModel({
    name,
    requestToJoin,
    ownerUserId: decodedToken.payload._id,
    members: [decodedToken.payload._id],
    requests: [],
  })

  await newGroup.save()

  const onlineUser = OnlineUsers.get(newGroup.ownerUserId.toString())

  // adding user to its new group
  if (onlineUser) {
    io.in(onlineUser.socketId).socketsJoin(newGroup._id.toString())
  }

  return newGroup
}
