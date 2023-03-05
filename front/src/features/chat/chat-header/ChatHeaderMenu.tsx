import styles from "./ChatHeaderMenu.module.scss"
import { useState } from "react"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"
import { useChatCtx } from "../context/ChatContext"
import { BiDotsVerticalRounded } from "react-icons/bi"

export function ChatHeaderMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          width: "40px",
          height: "100%",
          borderRadius: "6px",
          padding: "6px",
          background: "black",
          // display: "flex",
        }}
      >
        <BiDotsVerticalRounded
          // style={{ height: "100%", width: "auto", margin: "0 auto" }}
          style={{ height: "27px", width: "auto", margin: "0 auto" }}
        />
      </button>
      {isOpen && (
        <ul
          className={styles.menu}
          style={{ position: "absolute", top: "100%", right: "0" }}
        >
          <li onClick={() => setIsOpen(false)} style={{ whiteSpace: "nowrap" }}>
            <VisitProfileBtn />
          </li>

          <li onClick={() => setIsOpen(false)} style={{ whiteSpace: "nowrap" }}>
            <CloseChat />
          </li>
        </ul>
      )}
    </div>
  )
}

function CloseChat() {
  // const { setChatCtx } = useChatCtx()
  const { setView } = useSideRightCtx()

  return (
    <button
      className={styles.menuItem}
      onClick={() => {
        setView({ mode: null })
      }}
    >
      Close chat
    </button>
  )
}

export function VisitProfileBtn() {
  const { chatCtx } = useChatCtx()
  const { setView } = useSideRightCtx()

  return (
    <button
      className={styles.menuItem}
      onClick={() => {
        setView({
          mode: "profile-page",
          as: chatCtx.current.as,
          id: chatCtx.current.id,
        })
      }}
    >
      Visit profile
    </button>
  )
}
