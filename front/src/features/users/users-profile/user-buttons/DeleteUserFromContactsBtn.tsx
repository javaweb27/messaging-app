import { fetchJson } from "../../../../lib/fetchJson"

export function DeleteUserFromContactsBtn({ id }: { id: string }) {
  const handleClick = async () => {
    fetchJson(`/api/contacts`, {
      method: "DELETE",
      headers: { authorization: `jwt` },
      body: JSON.stringify({ userId: id }),
    }).then(async () => {
      // console.log("------")
      // console.log("CONTACTS DELETE")
      // console.log("ok:", res.ok)
      // console.log("json:", await res.json())
    })
  }

  return (
    <button className={"btn"} onClick={handleClick}>
      Delete contact
    </button>
  )
}
