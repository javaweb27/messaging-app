import styles from "../../chat/chat-list/ChatList.module.scss"
import { useCallback } from "react"
import { useGetGroupsToDiscover, GroupRes } from "./useGetGroupsToDiscover"
import { FaLock, FaUsers } from "react-icons/fa"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"

/** shows all public groups (discover) */
export function GroupsToDiscover() {
  const { error, loading, value } = useGetGroupsToDiscover()

  if (error) return <ErrorMessage />

  if (loading) return <LoadingMessage />

  return (
    <div>
      <ul>
        {value?.map(group => {
          return <ChatGroupListItem key={group._id} group={group} />
        })}
      </ul>
    </div>
  )
}

function ChatGroupListItem({ group }: { group: GroupRes }) {
  // const { chatCtx } = useChatCtx()
  const { view, setView } = useSideRightCtx()

  const isChatCurrent =
    view.mode === "profile-page" && view.as === "group" && view.id === group._id

  const handleClick = useCallback(() => {
    setView({
      mode: "profile-page",
      as: "group",
      id: group._id,
    })
  }, [])

  return (
    <li
      onClick={handleClick}
      className={`${styles.item} ${isChatCurrent ? styles.isActive : ""}`}
    >
      <FaUsers style={{ fontSize: "27px" }} />
      {group.name}
      {group.requestToJoin ? <FaLock /> : ""}
    </li>
  )
}

function ErrorMessage() {
  return <div>error, something went wrong</div>
}

function LoadingMessage() {
  return <div>LOADING...</div>
}
