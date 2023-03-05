import { useEffect } from "react"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { socket, WsServerEmits } from "../../../socket"
import { useChatCtx } from "../../chat/context/ChatContext"

type Listener = WsServerEmits["back:my-request-accepted"]

/**
 * (when an admin accept the request of a user)
 *
 * adds a welcome message to the group's chat that is visible only for the new user
 */
export function useChatCheckRequestAccepted() {
  const { loginData } = useLoginDataCtx()
  const { setChatCtx, addNewMessage } = useChatCtx()
  const { setProfilesDataCtx } = useProfilesDataCtx()
  useEffect(() => {
    if (!loginData?.id) return

    const joiningRoom: Listener = groupData => {
      console.log("my request to join a group was accepted")
      setProfilesDataCtx(({ ...cv }) => {
        cv.groups.set(groupData.id, { nickname: groupData.name })

        return cv
      })

      setChatCtx(({ ...state }) => {
        addNewMessage(state, {
          id: groupData.id,
          as: "group",
          newMsg: [groupData.id, `Welcome to the group`],
        })
        // update names of groups or user?
        return state
      })

      socket.emit("front:my-request-accepted", groupData.id)
    }

    socket.on("back:my-request-accepted", joiningRoom)

    return () => {
      socket.off("back:my-request-accepted", joiningRoom)
    }
  }, [loginData])

  return null
}
