import styles from "./SideLeftHeader.module.scss"
import { useChatCtx } from "../../../features/chat/context/ChatContext"
import { SideLeftContentData } from "../side-left-content/SideLeftContent"
import { useSideLeftContentCtx } from "../side-left-content/SideLeftContentContext"

const SideLeftContentDataList = Object.keys(
  SideLeftContentData
) as (keyof typeof SideLeftContentData)[]

/**
 * button with text for sub menu
 *
 * determines the content of the list
 */
export function SideLeftHeaderUserDataMenu() {
  const [currentContent, setCurrentContent] = useSideLeftContentCtx()
  return (
    <div style={{ position: "relative", margin: "0 .5rem" }}>
      <button
        style={{
          height: "100%",
          verticalAlign: "middle",
          padding: ".64rem",
          position: "relative",
          fontWeight: "700",
        }}
      >
        {currentContent}
        <MessageNotification />
      </button>
      <ul className={styles.list}>
        {SideLeftContentDataList.map(text => {
          return (
            <li key={text}>
              <button onClick={() => setCurrentContent(text)}>{text}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function MessageNotification() {
  const { chatCtx } = useChatCtx()

  const unreadCountTotal = chatCtx.items.reduce((prev, chat) => {
    return chat.unreadCount + prev
  }, 0)

  if (unreadCountTotal === 0) return null

  return (
    <div
      style={{
        top: "0",
        position: "absolute",
        width: "16px",
        height: "16px",
        backgroundColor: "black",
      }}
    >
      {unreadCountTotal}
    </div>
  )
}
