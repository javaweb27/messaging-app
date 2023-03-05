import { fetchJson } from "../../../../lib/fetchJson"
import { GroupMenuItemBtn } from "../GroupsProfileButtons"

export function DeleteGroupBtn({ groupId }: { groupId: string }) {
  const handleClick = async () => {
    const res = await fetchJson(`/api/groups`, {
      method: "DELETE",
      headers: {
        authorization: `jwt`,
      },
      body: JSON.stringify({ groupId }),
    })

    if (!res.ok) {
      // console.log("could not delete the group")
      // console.log("status: " + res.status)
      return
    }

    await res.json()
    // console.log("group deleted")
    // console.log(json)
  }

  return <GroupMenuItemBtn onClick={handleClick}>Delete group</GroupMenuItemBtn>
}
