import styles from "./ChatCurrentContainer.module.scss"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"
import { ChatHeader } from "../chat-header/ChatHeader"
import { ChatMessages } from "../chat-messages/ChatMessages"
import { ChatMessagesForm } from "../chat-messages-form/ChatMessagesForm"

export function ChatCurrentContainer() {
  const { view } = useSideRightCtx()

  if (view.mode !== "chat") {
    return null
  }

  return (
    <div className={styles.chat}>
      <ChatHeader />
      <ChatMessages />
      <ChatMessagesForm />
      {/* <ProfilePage /> */}
    </div>
  )
}
