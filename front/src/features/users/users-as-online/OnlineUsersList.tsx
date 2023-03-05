import styles from "../../chat/chat-list/ChatList.module.scss"
import { useCallback } from "react"
import { OnlineUserRes, useGetOnlineUsers } from "./useGetOnlineUsers"
import { FaUserCircle } from "react-icons/fa"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"

/** shows all online users */
export function ChatOnlineUsersList() {
  const { error, loading, value } = useGetOnlineUsers()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error || !value) {
    return <p>Something went wrong</p>
  }

  return (
    <ul>
      {value?.map(user => {
        return <ChatOnlineUsersListItem key={user._id} user={user} />
      })}
    </ul>
  )
}

function ChatOnlineUsersListItem({ user }: { user: OnlineUserRes }) {
  const { view, setView } = useSideRightCtx()

  const isChatCurrent =
    view.mode === "profile-page" && view.as === "user" && view.id === user._id

  const handleClick = useCallback(() => {
    setView({
      mode: "profile-page",
      as: "user",
      id: user._id,
    })
  }, [])

  return (
    <li
      onClick={handleClick}
      className={`${styles.item} ${isChatCurrent ? styles.isActive : ""}`}
    >
      <FaUserCircle style={{ fontSize: "27px" }} />
      {user.email}
    </li>
  )
}
