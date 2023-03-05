import { useEffect } from "react"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { useChatCtx } from "../context/ChatContext"
import useSetCurrentChat from "../hooks/useSetCurrentChat"
import styles from "./ChatList.module.scss"
import { FaUsers, FaUserCircle } from "react-icons/fa"

/**
 * shows all chats, chats from users and chats from groups
 *
 * client can click on one of them to see the messages
 */
export function ChatList() {
  const { chatCtx } = useChatCtx()
  const { profilesDataCtx } = useProfilesDataCtx()
  const setCurrentChat = useSetCurrentChat()

  const getChatData = (chatId: string, chatAs: "group" | "user") => {
    if (chatAs === "group") {
      return profilesDataCtx.groups.get(chatId)
    }
    if (chatAs === "user") {
      return profilesDataCtx.users.get(chatId)
    }
  }

  if (chatCtx.items.length === 0) {
    return <p>you don't have any chat</p>
  }

  return (
    <ul>
      {chatCtx.items.map(chat => {
        const nickname = getChatData(chat.id, chat.as)?.nickname || "unknown name"
        const isChatCurrent = chat.id === chatCtx.current.id
        const activeClassName = isChatCurrent ? styles.isActive : ""

        return (
          <li
            key={chat.id}
            className={`${styles.item} ${activeClassName}`}
            onClick={() => {
              setCurrentChat({
                id: chat.id,
                nickname,
                as: chat.as,
              })
            }}
          >
            {chat.as === "group" ? (
              <FaUsers style={{ fontSize: "27px" }} />
            ) : (
              <FaUserCircle style={{ fontSize: "27px" }} />
            )}
            <div>
              <span className={styles.title}>{nickname}</span>
              <br />
              <span className={styles.lastMessage}>{chat.messages.at(-1)?.[1]}</span>
            </div>
            <NewMessageSignal
              unreadCount={chat.unreadCount}
              chatId={chat.id}
              isChatCurrent={isChatCurrent}
            />
          </li>
        )
      })}
    </ul>
  )
}

function NewMessageSignal({
  chatId,
  isChatCurrent,
  unreadCount,
}: {
  chatId: string
  isChatCurrent: boolean
  unreadCount: number
}) {
  const { setChatCtx } = useChatCtx()

  useEffect(() => {
    // removes signal when this chat is selected or it is already selected
    if (isChatCurrent && unreadCount > 0) {
      setChatCtx(({ ...s }) => {
        const chatIndex = s.items.findIndex(chat => chat.id === chatId)

        if (chatIndex === -1) {
          return s
        }

        s.items[chatIndex] = {
          ...s.items[chatIndex],
          unreadCount: 0, // reset to 0 when this chat is in current chat
        }

        return s
      })
    }
  }, [isChatCurrent, unreadCount])

  return (
    <div className={`${styles.newMessage} ${unreadCount > 0 ? styles.isActive : ""}`}>
      {unreadCount > 0 ? unreadCount : null}
    </div>
  )
}
