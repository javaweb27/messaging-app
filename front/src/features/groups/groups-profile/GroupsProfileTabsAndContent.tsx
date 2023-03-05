import styles from "./GroupsProfileTabsAndContent.module.scss"
import { useState } from "react"
import { GroupsProfileMembers } from "./GroupsProfileMembers"
import { GroupsProfileRequests } from "./GroupsProfileRequests"

const tabList = ["Members", "Requests"] as const

export function GroupsProfileTabsAndContent({
  groupId,
  isOwner,
}: {
  groupId: string
  isOwner: boolean
}) {
  const [currentTab, setCurrentTab] = useState<(typeof tabList)[number]>(tabList[0])

  return (
    <>
      <ul className={styles.list}>
        {tabList.map(tab => {
          return (
            <li key={tab}>
              <button
                className={`${styles.btn} ${tab === currentTab ? styles.isActive : ""}`}
                onClick={() => {
                  setCurrentTab(tab)
                }}
              >
                {tab}
              </button>
            </li>
          )
        })}
      </ul>
      {currentTab === "Members" ? <GroupsProfileMembers groupId={groupId} /> : ""}
      {isOwner && currentTab === "Requests" && (
        <GroupsProfileRequests groupId={groupId} />
      )}
    </>
  )
}
