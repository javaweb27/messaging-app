import { createContext, PropsWithChildren, useContext, useState } from "react"

const ChatContext = createContext(undefined! as ChatCtx)

interface ChatCtx {
  chatCtx: ChatCtxState
  setChatCtx: React.Dispatch<React.SetStateAction<ChatCtxState>>
  addNewMessage: (state: ChatCtxState, chatData: ChatData) => void
  /**
   * returns the data of a chat which was indicated
   * in chatCtx.current.id
   * */
  getCurrentChat: (state: ChatCtxState) => ChatCtxState["items"][number] | undefined
}

type ChatAs = "user" | "group"

export interface ChatCtxState {
  current: {
    id: string
    nickname: string
    as: ChatAs
  }
  items: {
    /** userId or groupId */
    id: string
    unreadCount: number
    /**
     * [userId, text]
     *
     * this userId is redundant when the chat is "one user" to "one user"
     */
    messages: [string, string][]
    as: ChatAs
  }[]
}

interface ChatProviderProps extends Required<PropsWithChildren> {
  testStateValue?: ChatCtxState
}

export function ChatProvider({ children, testStateValue }: ChatProviderProps) {
  const [chatCtx, setChatCtx] = useState<ChatCtxState>(
    testStateValue ?? {
      current: { as: "group", id: "", nickname: "MEPYT" },
      items: [],
    }
  )

  return (
    <ChatContext.Provider value={{ chatCtx, setChatCtx, addNewMessage, getCurrentChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatCtx = () => useContext(ChatContext)

/* UTILITIES */

function getCurrentChat(s: ChatCtxState) {
  return s.items.find(chat => chat.id === s.current.id)
}

//

interface ChatData {
  id: string
  as: ChatAs
  /** [userId, text] */
  newMsg: [string, string]
  /**  default is true */
  receivingMsg?: boolean
}

/**
 * adds a new message to a existent chat
 * or creates a new chat
 */
function addNewMessage(s: ChatCtxState, chatData: ChatData) {
  const chatIndex = s.items.findIndex(chat => chat.id === chatData.id)

  chatData.receivingMsg ??= true

  // const extraUnreadCount = chatData.receivingMsg ===  ?"":""

  // chat does not exist, creating a new one
  if (chatIndex === -1) {
    s.items = [
      ...s.items,
      {
        id: chatData.id,
        as: chatData.as,
        messages: [chatData.newMsg],
        unreadCount: chatData.receivingMsg ? 1 : 0,
      },
    ]

    return
  }

  // updating an existent chat

  const extraUnreadCount = chatData.receivingMsg ? 1 : 0

  s.items = [...s.items]

  s.items[chatIndex] = {
    ...s.items[chatIndex],
    unreadCount: s.items[chatIndex].unreadCount + extraUnreadCount,
    messages: [...s.items[chatIndex].messages, chatData.newMsg],
  }
}
