import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"

export interface UserRes {
  _id: string
  email: string
  contacts: string[]
}

/** fetches all contacts of the user */
export default function useGetContacts() {
  const { error, loading, value } = useAsync<(null | UserRes)[]>(async () => {
    const res = await fetchJson(`/api/contacts`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    if (!res.ok) {
      return []
    }

    const json = await res.json()

    return json
  })

  return { error, loading, value }
}
