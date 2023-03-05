import { OnlineUsers } from "../z-sio-state/OnlineUsers"
import { SocketHandler } from "../sockets"
import GroupModel from "../models/GroupModel"
import { AuthJwtDecoded } from "../lib/createAuthJwt"

export const sioMessages: SocketHandler = (io, socket) => {
  socket.on("front:send-message", async data => {
    const decodedToken = socket.data.decodedToken as AuthJwtDecoded
    const { receiverAs, receiverId, text } = data

    if (receiverAs === "group") {
      console.log("\na groups is receiving a message")
      if (!receiverId) {
        return console.log("receiverId is falsy")
      }

      const receiverGroup = await GroupModel.findById(receiverId)

      if (!receiverGroup)
        return console.log(`global group with id ${receiverId} dodes not exist`)

      // console.log(`senderNickname: ${decodedToken.payload.email}`)
      // console.log(`senderUserId: ${decodedToken.payload._id}`)
      // console.log(`name of group is ${receiverGroup.name}(found from db)`)
      // console.log(`id of group is ${receiverId}`)

      // stop when user isn't a member of the group
      if (
        false ===
        receiverGroup.members.some(
          ({ _id }) => _id.toString() === decodedToken.payload._id
        )
      ) {
        // console.log(
        //   `${decodedToken.payload.email} isn't a members of ${receiverGroup.name} group`
        // )
        console.log("join to the group is required")

        return
      }

      socket.to(receiverId).emit("back:send-message", {
        senderId: decodedToken.payload._id,
        senderNickname: decodedToken.payload.email,
        text,
        receiverId,
        receiverAs,
        chatId: receiverGroup._id.toString(),
        chatNickname: receiverGroup.name,
      })

      return
    }

    if (receiverAs === "user") {
      console.log(`\na user is receiving a message`)
      const receiverUser = OnlineUsers.get(receiverId)

      if (!receiverUser) {
        console.log(`receiver user id (${receiverId}) does not exist in OnlineUsers`)
        return
      }

      // console.log(`senderNickname: ${decodedToken.payload.email}`)
      // console.log(`senderUserId: ${decodedToken.payload._id}`)
      // console.log(`receiverUserNickname: ${receiverUser.email}`)
      // console.log(`receiverUserId: ${receiverUser.userId}`)

      socket.to(receiverUser.socketId).emit("back:send-message", {
        senderId: decodedToken.payload._id,
        senderNickname: decodedToken.payload.email,
        text,
        receiverAs,
        receiverId,
        chatId: decodedToken.payload._id,
        chatNickname: decodedToken.payload.email,
      })
    } else {
      console.log("\n------")
      console.log("cannot send message, receiverAs is invalid")
      console.log("receiverAs is", receiverAs)
      console.log("receiverId is", receiverId)
      // console.log("senderId is", decodedToken.payload._id)
      // console.log("senderNickname is", decodedToken.payload.email)
      // console.log("message is:", text, "\n")
    }
  })
}
