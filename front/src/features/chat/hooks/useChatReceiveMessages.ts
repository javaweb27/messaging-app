import { useEffect } from "react"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { WsServerEmits, socket } from "../../../socket"
import { useChatCtx } from "../../chat/context/ChatContext"

type Listener = WsServerEmits["back:send-message"]

export function useChatReceiveMessages() {
  const { chatCtx, setChatCtx, addNewMessage } = useChatCtx()
  const { setProfilesDataCtx } = useProfilesDataCtx()

  useEffect(() => {
    const receiveMessage: Listener = data => {
      // console.log("---------")
      // console.log(`receiving message`)
      // console.log(`senderUserId: ${data.senderId}`)
      // console.log(`senderNickname: ${data.senderNickname}`)
      // console.log(`receiver is a ${data.receiverAs}`)
      // console.log(`id of receiver is: ${data.receiverId}`)

      // console.log(`text is: ${data.text}`)

      setChatCtx(({ ...s }) => {
        addNewMessage(s, {
          id: data.chatId,
          as: data.receiverAs,
          newMsg: [data.senderId, data.text],
        })
        return s
      })

      setProfilesDataCtx(({ ...s }) => {
        if (data.receiverAs === "user") {
          s.users.set(data.chatId, { nickname: data.chatNickname })
        }

        if (data.receiverAs === "group") {
          s.users.set(data.senderId, { nickname: data.senderNickname })
          s.groups.set(data.chatId, {
            nickname: data.chatNickname,
          })
        }
        return s
      })
    }

    socket.on("back:send-message", receiveMessage)

    return () => {
      socket.off("back:send-message", receiveMessage)
    }
  }, [chatCtx.items])

  return null
}
