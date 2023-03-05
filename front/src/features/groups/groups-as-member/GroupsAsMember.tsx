import styles from "../../chat/chat-list/ChatList.module.scss"
import { useCallback, useMemo } from "react"
import useSetCurrentChat from "../../chat/hooks/useSetCurrentChat"
import { GroupRes, useGetGroupsAsMember } from "./useGetGroupsAsMember"
import { useChatCtx } from "../../chat/context/ChatContext"
import { FaUsers } from "react-icons/fa"

/**
 * shows all groups where the user is a member
 *
 * each item is clickable
 * */
export function ChatGroupAsMemberList() {
  const { error, loading, value } = useGetGroupsAsMember()

  if (error) return <ErrorMessage />

  if (loading) return <LoadingMessage />

  if (!value) {
    return <div>value is undefined</div>
  }

  if (value.length === 0) {
    return <div>You haven't joined any group yet</div>
  }

  return (
    <ul>
      {value.map(group => {
        return <ChatGroupAsMemberListItem key={group._id} group={group} />
      })}
    </ul>
  )
}

function ChatGroupAsMemberListItem({ group }: { group: GroupRes }) {
  const setCurrentChat = useSetCurrentChat()
  const { chatCtx } = useChatCtx()

  const isChatCurrent = useMemo(() => {
    return chatCtx.current.id === group._id
  }, [chatCtx.current.id])

  const handleClick = useCallback(() => {
    setCurrentChat({
      as: "group",
      id: group._id,
      nickname: group.name,
    })
  }, [])

  return (
    <li
      className={`${styles.item} ${isChatCurrent ? styles.isActive : ""}`}
      onClick={handleClick}
    >
      <FaUsers style={{ fontSize: "26px" }} />
      {group.name}
    </li>
  )
}

function ErrorMessage() {
  return <div>error, something went wrong</div>
}

function LoadingMessage() {
  return <div>LOADING...</div>
}
