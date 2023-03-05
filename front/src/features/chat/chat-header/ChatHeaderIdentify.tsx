import { useChatCtx } from "../context/ChatContext"
import { FaUserCircle, FaUsers } from "react-icons/fa"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"

export function ChatHeaderIdentify() {
  const { loginData } = useLoginDataCtx()
  const { chatCtx } = useChatCtx()
  const isItMe = loginData?.id === chatCtx.current.id

  const iconSize = { width: "26px", height: "26px" }

  const targetKind =
    chatCtx.current.as === "group" ? (
      <FaUsers style={iconSize} />
    ) : chatCtx.current.as === "user" ? (
      <FaUserCircle style={iconSize} />
    ) : (
      "invalid target as"
    )

  return (
    <div>
      <h2>
        {loginData?.email ? "Logged in as " + loginData.email : "Login is required"}
      </h2>
      <h2>
        {isItMe ? (
          "Myself"
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: ".19rem" }}>
            {targetKind} {chatCtx.current.nickname}
          </div>
        )}
      </h2>
    </div>
  )
}
