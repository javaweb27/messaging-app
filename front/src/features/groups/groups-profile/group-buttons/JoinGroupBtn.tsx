import { socket } from "../../../../socket"
import { GroupMenuItemBtn } from "../GroupsProfileButtons"

export function JoinGroupBtn({
  requestToJoin,
  groupId,
}: {
  requestToJoin: boolean
  groupId: string
}) {
  function handleJoinGroup() {
    socket.emit("front:join-group", groupId)
  }

  return (
    <GroupMenuItemBtn onClick={handleJoinGroup}>
      {requestToJoin ? "Send request" : "Join group"}
    </GroupMenuItemBtn>
  )
}
