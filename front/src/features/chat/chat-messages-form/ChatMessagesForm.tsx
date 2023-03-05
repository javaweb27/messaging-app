import styles from "./ChatMessagesForm.module.scss"
import { useRef } from "react"
import { socket } from "../../../socket"
import { useChatCtx } from "../context/ChatContext"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"

export function ChatMessagesForm() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { loginData } = useLoginDataCtx()
  const { chatCtx, setChatCtx, addNewMessage } = useChatCtx()
  const { setProfilesDataCtx } = useProfilesDataCtx()

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const text = inputRef.current?.value ?? ""

    if (!loginData?.email || !text || !loginData?.id) {
      // console.log("name,text, or id is empty")
      return
    }

    console.log("emitting message")

    socket.emit("front:send-message", {
      receiverId: chatCtx.current.id,
      receiverAs: chatCtx.current.as,
      text,
    })

    setChatCtx(({ ...s }) => {
      addNewMessage(s, {
        as: s.current.as,
        id: s.current.id,
        newMsg: [loginData.id, text],
        receivingMsg: false,
      })

      return s
    })

    setProfilesDataCtx(({ ...s }) => {
      // since is a user who always sends a message
      // updates always profile of users
      if (chatCtx.current.as === "user") {
        s.users.set(chatCtx.current.id, {
          nickname: chatCtx.current.nickname,
        })
      }

      //updates groupsData only when receiver is a group
      if (chatCtx.current.as === "group") {
        s.groups.set(chatCtx.current.id, {
          nickname: chatCtx.current.nickname,
        })
      }
      return s
    })

    inputRef.current!.value = ""
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        rows={1}
        ref={inputRef}
        className={styles.formInput}
        placeholder="Write someting"
      />

      <button disabled={!loginData} className={styles.formSubmit}>
        submit
      </button>
    </form>
  )
}
