import { GroupsRequestsThey } from "../features/groups/groups-requests/GroupsRequestsThey"
import { GroupsRequestsMe } from "../features/groups/groups-requests/GroupsRequestsMe"

/**
 * shows all requests from other users and me:
 *
 * join-group requests
 *
 * contact requests
 */

export function Requests() {
  return (
    <div>
      <p>
        <strong style={{ padding: "0 .4rem" }}>My Requests</strong>
      </p>
      <GroupsRequestsMe />
      <br />
      <p>
        <strong style={{ padding: "0 .4rem" }}>Users Requests</strong>
      </p>
      <GroupsRequestsThey />
    </div>
  )
}
