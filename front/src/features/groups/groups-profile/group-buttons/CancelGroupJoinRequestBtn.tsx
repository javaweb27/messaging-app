import { socket } from "../../../../socket"
import { GroupMenuItemBtn } from "../GroupsProfileButtons"
export function CancelGroupJoinRequestBtn({ groupId }: { groupId: string }) {
  function handleJoinGroup() {
    // send auth token for this data?
    socket.emit("front:cancel-join-request", groupId)
  }

  return <GroupMenuItemBtn onClick={handleJoinGroup}>Cancel request</GroupMenuItemBtn>
}
