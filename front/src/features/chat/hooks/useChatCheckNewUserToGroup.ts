import { useEffect } from "react"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"
import { useProfilesDataCtx } from "../../../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { socket, WsServerEmits } from "../../../socket"
import { useChatCtx } from "../context/ChatContext"

type Listener = WsServerEmits["back:user-joins-group"]

/** adds a welcome message to group's chat, but it isn't visible for new user */
export function useChatCheckNewUserToGroup() {
  const { loginData } = useLoginDataCtx()
  const { setChatCtx, addNewMessage } = useChatCtx()
  const { setProfilesDataCtx } = useProfilesDataCtx()

  useEffect(() => {
    const newUserJoinsGroup: Listener = ({ groupId, groupName }) => {
      // local data of group could be undefined
      // if the ures does not have any message of that group
      // so updating group profile

      setProfilesDataCtx(({ ...cv }) => {
        cv.groups.set(groupId, { nickname: groupName })

        return cv
      })

      setChatCtx(({ ...s }) => {
        addNewMessage(s, {
          id: groupId,
          as: "group",
          newMsg: [groupId, "A new user join the group"],
        })
        // update names of the group ??
        return s
      })
    }
    socket.on("back:user-joins-group", newUserJoinsGroup)

    return () => {
      socket.off("back:user-joins-group", newUserJoinsGroup)
    }
  }, [loginData])
}
