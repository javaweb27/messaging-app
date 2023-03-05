import styles from "./GroupsProfileMembers.module.scss"
import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"
import { socket } from "../../../socket"
import { FaUserCircle } from "react-icons/fa"

export function GroupsProfileRequests({ groupId }: { groupId: string }) {
  const { error, loading, value } = useGetGroupRequests(groupId)

  if (error) {
    return <span>error when fetching</span>
  }
  if (loading) {
    return <span>loading requests</span>
  }
  if (!value) {
    return <span>value is undefined</span>
  }

  return (
    <ul>
      {value.users.map(user => {
        return (
          <li key={user._id} className={styles.listItem}>
            <FaUserCircle style={{ fontSize: "26px", display: "inline-block" }} />
            {user.email}

            <button
              className={styles.acceptReqBtn}
              onClick={() => {
                socket.emit("front:accept-request", {
                  groupId: groupId,
                  userId: user._id,
                })
              }}
            >
              Accept
            </button>
            <button
              className={styles.rejectReqBtn}
              onClick={() => {
                socket.emit("front:reject-request", {
                  groupId: groupId,
                  userId: user._id,
                })
              }}
            >
              Reject
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface GroupMembersRes {
  users: { _id: string; email: string }[]
}

function useGetGroupRequests(id: string) {
  return useAsync<GroupMembersRes | undefined>(async () => {
    const res = await fetchJson(`/api/groups/${id}/requests`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    if (!res.ok) {
      return undefined
    }

    return (await res.json()) as GroupMembersRes
  })
}
