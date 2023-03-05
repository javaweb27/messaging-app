import { ChatGroupAsMemberList } from "./groups-as-member/GroupsAsMember"
import { GroupsCreateOne } from "./groups-create-one/GroupsCreateOne"

export default function GroupsContainer() {
  return (
    <>
      <GroupsCreateOne />

      <hr />

      <ChatGroupAsMemberList />
    </>
  )
}
