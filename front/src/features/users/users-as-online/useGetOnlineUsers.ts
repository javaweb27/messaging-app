import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

export interface OnlineUserRes {
  _id: string
  email: string
}

/**
 * fetches online users from NODE API and returns error,loading and value
 */
export function useGetOnlineUsers() {
  const { error, loading, value } = useAsync<OnlineUserRes[]>(async () => {
    const res = await fetchJson(`/api/users/online`, {
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

  return { error, loading, value }
}
