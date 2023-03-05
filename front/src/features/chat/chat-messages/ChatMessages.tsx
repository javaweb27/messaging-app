import styles from "./ChatMessages.module.scss"
import { useChatCtx } from "../context/ChatContext"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"

/**
 * shows all messages of current chat
 */
export function ChatMessages() {
  const { loginData } = useLoginDataCtx()
  const { chatCtx, getCurrentChat } = useChatCtx()
  const { profilesDataCtx } = useProfilesDataCtx()

  const current = getCurrentChat(chatCtx)

  const getChatData = (chatId: string, chatAs: "group" | "user") => {
    if (chatAs === "group") {
      return profilesDataCtx.groups.get(chatId)
    }
    if (chatAs === "user") {
      return profilesDataCtx.users.get(chatId)
    }
  }

  return (
    <ul className={styles.list}>
      {(current === undefined || current.messages.length === 0) && (
        <p className={styles.noMessages}>There is no message yet</p>
      )}
      {current?.messages.map(([userId, text], index) => {
        const isItMe = loginData?.id === userId

        const chatData = getChatData(userId, current.as)
        const userNickname = chatData?.nickname || "mysterious name"

        return (
          <ChatMessagesListItem
            key={index}
            text={text}
            isItMe={isItMe}
            name={isItMe ? "me" : userNickname}
          />
        )
      })}
    </ul>
  )
}

interface ChatMessagesListItemProps {
  isItMe: boolean
  text: string
  name: string
}

function ChatMessagesListItem({ isItMe, text, name }: ChatMessagesListItemProps) {
  return (
    <li className={isItMe ? styles.msgFromMe : styles.msgFromTarget}>
      <strong className={styles.nickname}>{name}</strong>
      <br />
      {text}
    </li>
  )
}
