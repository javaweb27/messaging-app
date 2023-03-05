import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

export type GroupsRequestMeRes = { _id: string; name: string }
// type DataToRender = {
//   userId: string
//   groupId: string
// }[]

export function useGetGroupsRequestsMe() {
  // param: fromMe: boolean
  /*
  requests are saved in chatContextDeleted
  so fetch cannot fetching data all the time
  if a new request comes, a listener of socketio
  updates the context
  validating context by setting undefined initially
  and only fetch data when it is undefined
   */
  return useAsync<GroupsRequestMeRes[]>(async () => {
    const res = await fetchJson(`/api/groups/requests/me`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    if (!res.ok) {
      // becaues of 401, no token
      return []
    }

    const json = (await res.json()) as GroupsRequestMeRes[]

    return json
  })
}
