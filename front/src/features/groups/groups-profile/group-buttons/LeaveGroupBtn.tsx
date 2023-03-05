import { socket } from "../../../../socket"
import { GroupMenuItemBtn } from "../GroupsProfileButtons"

export function LeaveGroupBtn({ groupId }: { groupId: string }) {
  function handleJoinGroup() {
    socket.emit("front:leave-group", groupId)
  }

  return <GroupMenuItemBtn onClick={handleJoinGroup}>Leave group</GroupMenuItemBtn>
}
