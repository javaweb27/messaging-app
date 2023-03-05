import styles from "./GroupsRequestsMe.module.scss"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"
import { socket } from "../../../socket"

import { GroupsRequestMeRes, useGetGroupsRequestsMe } from "./useGetGroupsRequestsMe"

/**
 * shows all request of users that want
 * to join to my groups (one or many)
 *
 * every list item has buttons to accept or reject the request
 */
export function GroupsRequestsMe() {
  const { loading, value } = useGetGroupsRequestsMe()

  if (loading) {
    return <>loading requests...</>
  }
  if (!value) {
    return <>value results in falsy: {JSON.stringify(value)}</>
  }

  // console.log(value)
  if (value.length === 0) {
    return <div style={{ padding: "0 .4rem" }}>Empty list</div>
  }

  return (
    <ul>
      {value.map((data, index) => {
        return <CancelItem key={index} groupData={data} />
      })}
    </ul>
  )
}

function CancelItem({ groupData }: { groupData: GroupsRequestMeRes }) {
  const { setView } = useSideRightCtx()

  return (
    <li className={styles.item}>
      <p>
        Your request to join <strong>{groupData.name}</strong> group
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.btnVisitGroup}
          onClick={() => {
            setView({ mode: "profile-page", as: "group", id: groupData._id })
          }}
        >
          Visit group
        </button>

        <button
          className={styles.btnCancel}
          onClick={() => {
            socket.emit("front:cancel-join-request", groupData._id)
          }}
        >
          Cancel
        </button>
      </div>
    </li>
  )
}
