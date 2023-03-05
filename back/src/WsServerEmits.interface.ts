export interface WsServerEmits {
  "back:send-joined-rooms": (rooms: Group[]) => void
  "back:send-requested-rooms": (rooms: Group[]) => void
  "back:send-own-rooms": (rooms: Group[]) => void
  "back:send-message": (data: MessageServer) => void
  "back:my-request-accepted": (groupData: Omit<Group, "requests">) => void
  "back:user-joins-group": (data: {
    userId: string
    groupId: string
    groupName: string
  }) => void
}

export interface OnlineUser {
  userId: string
  socketId: string
  email: string
}

export type Group = {
  id: string
  name: string
  ownerUserId: string
  members: string[] //userId
} & GroupPartPublic

type GroupPartPublic = {
  requestToJoin: boolean
  /** ids of user */
  requests: Set<string>
}

export type MessageServer = {
  /** it is always an id of a user(id from db) */
  senderId: string
  /** it is nickname of the sender user */
  senderNickname: string // incomingChatName
  /**
   * receiverId can be a user id(from db) or a group id(generated)
   */
  receiverId: string
  /**
   * It can be 2 posibilities:
   *
   * -userId of sender: when a user receives the message
   *
   * -groupId: when a group receives the message
   */
  chatId: string
  /** user nickname of sender OR group name */
  chatNickname: string
  text: string
} & ({ receiverAs: "user" } | { receiverAs: "group" })
