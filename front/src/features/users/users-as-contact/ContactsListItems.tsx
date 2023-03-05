import styles from "../../chat/chat-list/ChatList.module.scss"
import { FaUserCircle } from "react-icons/fa"
import { UserRes } from "./useGetContacts"
import { useChatCtx } from "../../chat/context/ChatContext"
import useSetCurrentChat from "../../chat/hooks/useSetCurrentChat"

export function ContactsListItems({ items }: { items: (UserRes | null)[] }) {
  const { chatCtx } = useChatCtx()
  const setCurrentChat = useSetCurrentChat()

  return (
    <ul>
      {items.map(user => {
        if (!user) return null

        const isChatCurrent = chatCtx.current.id === user._id

        return (
          <li
            className={`${styles.item} ${isChatCurrent ? styles.isActive : ""}`}
            key={user._id}
            onClick={() => {
              setCurrentChat({
                as: "user",
                id: user._id,
                nickname: user.email,
              })
            }}
          >
            <FaUserCircle style={{ fontSize: "27px" }} />
            {user.email}
          </li>
        )
      })}
    </ul>
  )
}
