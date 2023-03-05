import styles from "./GroupsProfile.module.scss"
import { ProfileViewSendMessageBtn } from "../../../features-integrations/ProfileViewSendMessageBtn"
import { HtmlHTMLAttributes } from "react"
import { CancelGroupJoinRequestBtn } from "./group-buttons/CancelGroupJoinRequestBtn"
import { JoinGroupBtn } from "./group-buttons/JoinGroupBtn"

interface GroupsProfileButtonsProps {
  isMember: boolean
  groupId: string
  isRequestSent: boolean
  requireRequest: boolean
}

export function GroupsProfileButtons({
  isMember,
  groupId,
  isRequestSent,
  requireRequest,
}: GroupsProfileButtonsProps) {
  return (
    <>
      {isMember ? (
        <ProfileViewSendMessageBtn id={groupId} nickname={"name"} />
      ) : isRequestSent ? (
        <CancelGroupJoinRequestBtn groupId={groupId} />
      ) : (
        <JoinGroupBtn groupId={groupId} requestToJoin={requireRequest} />
      )}
    </>
  )
}

/**
 * adding className won't work,
 * but i can work if this component mixes
 * local className with className of props
 * @returns
 */
export function GroupMenuItemBtn(props: HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <li className={styles.menuItem}>
      <button {...props} className={"btn"} />
    </li>
  )
}
