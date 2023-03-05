import styles from "./GroupsProfile.module.scss"
import { useGetGroupsProfile } from "./useGetGroupsProfile"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"
import { GroupsProfileTabsAndContent } from "./GroupsProfileTabsAndContent"
import { GroupsProfileButtons } from "./GroupsProfileButtons"
import { ProfilesViewBanner } from "../../../features-integrations/ProfilesViewBanner"
import { GroupsProfileMenu } from "./GroupsProfileMenu"

export function GroupsProfile({ id }: { id: string }) {
  const { loginData } = useLoginDataCtx()

  const { loading, value } = useGetGroupsProfile(id)

  if (loading) {
    return <div>loading user profile</div>
  }

  if (!value) {
    return <div>value result in undefined</div>
  }

  const isOwner = loginData?.id === value.ownerUserId

  return (
    <div>
      <ProfilesViewBanner isGroup profileName={value.name} />

      <div className={styles.center}>
        <GroupsProfileButtons
          groupId={value._id}
          isMember={value.isMember}
          isRequestSent={value.isRequestSent}
          requireRequest={value.requestToJoin}
        />

        {(value.isMember || isOwner) && (
          <GroupsProfileMenu groupId={value._id} isOwner={isOwner} />
        )}
      </div>

      <GroupsProfileTabsAndContent
        groupId={value._id}
        isOwner={value.ownerUserId === loginData?.id}
      />
    </div>
  )
}
