import styles from "./GroupsProfile.module.scss"
import { useState } from "react"
import { DeleteGroupBtn } from "./group-buttons/DeleteGroupBtn"
import { LeaveGroupBtn } from "./group-buttons/LeaveGroupBtn"

import { BiDotsVerticalRounded } from "react-icons/bi"

interface GroupsProfileButtonsProps {
  groupId: string
  isOwner: boolean
}

export function GroupsProfileMenu({ groupId, isOwner }: GroupsProfileButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.menuContainer}>
      <button
        onClick={() => {
          setIsOpen(cv => !cv)
        }}
      >
        <BiDotsVerticalRounded />
      </button>
      <ul className={`${styles.menu} ${isOpen ? styles.menuIsActive : ""}`}>
        <LeaveGroupBtn groupId={groupId} />

        {isOwner && <DeleteGroupBtn groupId={groupId} />}
      </ul>
    </div>
  )
}
