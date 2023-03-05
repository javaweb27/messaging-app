import { MessageServer } from "./WsServerEmits.interface"

export interface WsClientEmits {
  "front:my-request-accepted": (groupId: string) => void
  "front:send-message": (data: MessageClient) => void
  /** an admin accepts a request of a user so it can join to a group */
  "front:accept-request": (data: { groupId: string; userId: string }) => void
  "front:reject-request": (data: { groupId: string; userId: string }) => void
  // "front:accept-invitation": (data: MessageClient) => void
  "front:cancel-join-request": (groupId: string) => void
  "front:join-group": (groupId: string) => void
  "front:leave-group": (groupId: string) => void
}

type MessageClient = Pick<MessageServer, "receiverId" | "receiverAs" | "text">
