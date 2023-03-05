import styles from "./GroupsProfileMembers.module.scss"
import { useState } from "react"
import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"
import { FaUserCircle } from "react-icons/fa"

export function GroupsProfileMembers({ groupId }: { groupId: string }) {
  const { error, loading, value } = useGetGroupMembers(groupId)
  if (error) {
    return <span>error when fetching</span>
  }
  if (loading) {
    return <span>loading members</span>
  }
  if (!value) {
    return <span>value is undefined</span>
  }

  return (
    <ul>
      {value.members.map(user => {
        return (
          <li key={user._id} className={styles.listItem}>
            <FaUserCircle style={{ fontSize: "26px" }} />
            {user.email}
            {value.isAdmin && <ItemMenu userId={user._id} groupId={groupId} />}
          </li>
        )
      })}
    </ul>
  )
}

function ItemMenu({ userId, groupId }: { userId: string; groupId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const removeMember = async () => {
    const res = await fetchJson(`/api/groups/members`, {
      method: "DELETE",
      headers: { authorization: `jwt` },
      body: JSON.stringify({ userId, groupId }),
    })

    if (!res.ok) {
      // console.log("res.ok is false, " + res.status)
      return
    }

    // console.log("user has been removed from the group")
  }
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(val => !val)}>ME</button>
      <ul
        style={{
          display: isOpen ? "block" : "none",
          position: "absolute",
          top: "100%",
          right: "0",
        }}
      >
        <li>
          <button onClick={removeMember}>Remove from group</button>
        </li>
      </ul>
    </div>
  )
}

interface GroupMembersRes {
  members: { _id: string; email: string }[]
  isAdmin: boolean
}

function useGetGroupMembers(id: string) {
  return useAsync<GroupMembersRes | undefined>(async () => {
    const res = await fetchJson(`/api/groups/${id}/members`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    if (!res.ok) {
      return undefined
    }

    return (await res.json()) as GroupMembersRes
  })
}
