import { useChatCheckNewUserToGroup } from "../hooks/useChatCheckNewUserToGroup"
import { useChatCheckRequestAccepted } from "../hooks/useChatCheckRequestAccepted"
import { useChatReceiveMessages } from "../hooks/useChatReceiveMessages"

/**
 * contains all global socket listeners
 *
 * they need to be listening globaly
 */
export function ChatGlobalSocketListeners() {
  useChatReceiveMessages()

  useChatCheckRequestAccepted()
  useChatCheckNewUserToGroup()

  return null
}
