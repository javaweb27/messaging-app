import { OnlineUser } from "../WsServerEmits.interface"

export const OnlineUsers = {
  items: [] as OnlineUser[],
  add,
  remove,
  get,
}

function add(userId: string, socketId: string, email: string) {
  if (!OnlineUsers.items.some(user => user.userId === userId)) {
    OnlineUsers.items = [...OnlineUsers.items, { userId, socketId, email }]
  }
}

function remove(socketId: string) {
  OnlineUsers.items = OnlineUsers.items.filter(user => {
    if (user.socketId !== socketId) {
      return true
    } else {
      console.log("removing user:")
      // console.table(user)
    }
  })
}

function get(userId: string) {
  return OnlineUsers.items.find(user => user.userId === userId)
}
