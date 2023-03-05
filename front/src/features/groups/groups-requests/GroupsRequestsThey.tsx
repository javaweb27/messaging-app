import styles from "./GroupsRequestsThey.module.scss"
import { useSideRightCtx } from "../../../layout-structures/side-right/SideRightContext"
import {
  GroupsRequestTheyRes,
  useGetGroupsRequestsThey,
} from "./useGetGroupsRequestsThey"

/**
 * shows all request of users that want
 * to join to my groups (one or many)
 *
 * every list item redirect to group profile with request list
 */
export function GroupsRequestsThey() {
  const { loading, value } = useGetGroupsRequestsThey()

  if (loading) {
    return <>loading requests...</>
  }
  if (!value) {
    return <>value results in falsy: {JSON.stringify(value)}</>
  }

  let isEmpty = true

  value.map((data, index) => {
    if (data.requests.length === 0) {
      return null
    }

    isEmpty = false
    return <RequestsItem key={index} data={data} />
  })

  if (isEmpty) {
    return <div style={{ padding: "0 .4rem" }}>Empty list</div>
  }

  return (
    <ul>
      {value.map((data, index) => {
        if (data.requests.length === 0) {
          return null
        }

        return <RequestsItem key={index} data={data} />
      })}
    </ul>
  )
}

function RequestsItem({ data }: { data: GroupsRequestTheyRes }) {
  const { setView } = useSideRightCtx()

  return (
    <li className={styles.item}>
      <button
        onClick={() => {
          setView({ mode: "request", id: data._id, groupName: data.name })
        }}
        style={{ textAlign: "left" }}
      >
        {data.requests.length} requests for your <strong>{data.name}</strong> group
      </button>
    </li>
  )
}
