import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

export interface GroupRes {
  _id: string
  name: string
  members: string[]
  ownerUserId: string
  requestToJoin: boolean
  requests: string[]
}

/**
 * fetches all public groups from NODE API
 *
 * there is no private group
 */
export function useGetGroupsToDiscover() {
  const { error, loading, value } = useAsync<GroupRes[]>(async () => {
    const res = await fetchJson(`/api/groups`, {
      method: "GET",
      headers: {
        authorization: `jwt`,
      },
    })

    if (!res.ok) {
      // console.log("res.ok is false")
      return
    }

    return await res.json()
  })

  // console.log("value groups from fetch", value)

  return { error, loading, value }
}
