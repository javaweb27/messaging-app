import { useCallback } from "react"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"
import { ChatCtxState, useChatCtx } from "../context/ChatContext"

/**
 * returns a function:
 *
 * sets "useSideRightCtx" to "chat" mode
 *
 * and updates "current" data of "useChatCtx"
 */
export default function useSetCurrentChat() {
  const { setView } = useSideRightCtx()
  const { setChatCtx } = useChatCtx()

  const hook = useCallback((currentChat: ChatCtxState["current"]) => {
    setView({ mode: "chat" })
    setChatCtx(({ ...s }) => {
      s.current = currentChat
      return s
    })
  }, [])

  return hook
}
