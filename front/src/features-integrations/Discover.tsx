import { GroupsToDiscover } from "../features/groups/groups-to-discover/GroupsToDiscover"
import { ChatOnlineUsersList } from "../features/users/users-as-online/OnlineUsersList"

export default function Discover() {
  return (
    <div>
      <p>
        <strong>Public groups</strong>
      </p>
      <GroupsToDiscover />
      <br />
      <p>
        <strong>Online users</strong>
      </p>
      <ChatOnlineUsersList />
    </div>
  )
}
