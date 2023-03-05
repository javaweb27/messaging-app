import { fetchJson } from "../../../../lib/fetchJson"

export function AddUserAsContactBtn({ id }: { id: string }) {
  const handleClick = () => {
    fetchJson(`/api/contacts`, {
      method: "POST",
      headers: { authorization: `jwt` },
      body: JSON.stringify({ userId: id }),
    }).then(async () => {
      // console.log("------")
      // console.log("CONTACTS CREATE")
      // console.log("ok:", res.ok)
      // console.log("json:", await res.json())
    })
  }

  return (
    <button className={"btn"} onClick={handleClick}>
      Add contact
    </button>
  )
}
