import styles from "./ProfilesView.module.scss"
import { GroupsProfile } from "../features/groups/groups-profile"
import { useSideRightCtx } from "../layout-structures/side-right/SideRightContext"
import { FaWindowClose } from "react-icons/fa"
import { UserProfile } from "../features/users/users-profile/UserProfile"

/**
 * shows profile of a user or a group
 */
export function ProfilesView() {
  const { view, setView } = useSideRightCtx()

  if (view.mode !== "profile-page") return null

  return (
    <div className={styles.container}>
      <CloseButton close={() => setView({ mode: null })} />
      {view.as === "group" ? (
        <GroupsProfile id={view.id} />
      ) : view.as === "user" ? (
        <UserProfile id={view.id} />
      ) : null}
    </div>
  )
}

function CloseButton({ close }: { close: () => void }) {
  return (
    <button onClick={close}>
      <FaWindowClose style={{ width: "36px", height: "36px" }} />
    </button>
  )
}
