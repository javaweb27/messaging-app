import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

export type GroupsRequestTheyRes = { _id: string; name: string; requests: string[] }

export function useGetGroupsRequestsThey() {
  return useAsync<GroupsRequestTheyRes[]>(async () => {
    const res = await fetchJson(`/api/groups/requests/they`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })
    console.log("res")

    if (!res.ok) {
      // becaues of 401, no token
      return []
    }

    const json = await res.json()

    return json
  })
}
