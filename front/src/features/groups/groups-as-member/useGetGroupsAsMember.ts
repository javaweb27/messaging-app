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
 * fetches all groups which user is member
 */
export function useGetGroupsAsMember() {
  const { error, loading, value } = useAsync<GroupRes[]>(async () => {
    const res = await fetchJson(`/api/groups/all/as-member`, {
      method: "GET",
      headers: {
        authorization: `jwt`,
      },
    })

    if (!res.ok) {
      return console.log("res.ok is false")
    }

    return await res.json()
  })

  // console.log("value groups from fetch", value)

  return { error, loading, value }
}
