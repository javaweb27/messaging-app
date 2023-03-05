import { useSideRightCtx } from "../../layout-structures/side-right/SideRightContext"
import { GroupsProfileRequests } from "../groups/groups-profile/GroupsProfileRequests"
import { FaWindowClose } from "react-icons/fa"

export function RequestsPagesContainer() {
  const { view, setView } = useSideRightCtx()

  if (view.mode !== "request") {
    return null
  }

  const handleClickClose = () => {
    setView({ mode: null })
  }

  return (
    <div
      style={{
        padding: ".6rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <button onClick={handleClickClose}>
          <FaWindowClose style={{ fontSize: "36px" }} />
        </button>
        <h2>
          <strong>{view.groupName}</strong>
        </h2>
      </div>
      <GroupsProfileRequests key={view.id} groupId={view.id} />
    </div>
  )
}
