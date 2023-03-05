import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

interface GroupProfileRes {
  _id: string
  name: string
  ownerUserId: string
  requestToJoin: boolean
  isRequestSent: boolean
  isMember: boolean
}

export function useGetGroupsProfile(id: string) {
  const { error, loading, value } = useAsync<GroupProfileRes | undefined>(async () => {
    const res = await fetchJson(`/api/groups/profile/${id}`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    const json = await res.json()

    // console.log(json)

    if (!res.ok) {
      // console.log("res.ok is false, " + res.status)

      return
    }

    return json
  }, [id])

  return { error, loading, value }
}
