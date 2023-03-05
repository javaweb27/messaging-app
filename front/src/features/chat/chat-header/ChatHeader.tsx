import { ChatHeaderIdentify } from "./ChatHeaderIdentify"
import { ChatHeaderMenu } from "./ChatHeaderMenu"

export function ChatHeader() {
  return (
    <header
      style={{
        padding: "6px 6px",
        background: "rgb(30, 30, 30)",
        display: "flex",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
      }}
    >
      <ChatHeaderIdentify />
      <ChatHeaderMenu />
    </header>
  )
}
