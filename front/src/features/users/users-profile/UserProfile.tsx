import styles from "./UserProfile.module.scss"
import { useAsync } from "../../../hooks/useAsync"
import { fetchJson } from "../../../lib/fetchJson"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"
import { ProfilesViewBanner } from "../../../features-integrations/ProfilesViewBanner"
import { ProfileViewSendMessageBtn } from "../../../features-integrations/ProfileViewSendMessageBtn"
import { UserRes } from "../users-as-contact/useGetContacts"
import { DeleteUserFromContactsBtn } from "./user-buttons/DeleteUserFromContactsBtn"
import { AddUserAsContactBtn } from "./user-buttons/AddUserAsContactBtn"

interface User extends Omit<UserRes, "contacts"> {
  isContact: boolean
}

export function UserProfile({ id }: { id: string }) {
  const { loading, value } = useAsync<User | undefined>(async () => {
    const res = await fetchJson(`/api/users/profile/${id}`, {
      method: "GET",
      headers: { authorization: `jwt` },
    })

    const json = (await res.json()) as User

    // console.log(json)

    if (!res.ok) {
      // console.log("res.ok is false, " + res.status)

      return
    }

    return json
  }, [id])

  if (loading) {
    return <div>loading user profile</div>
  }

  if (!value) {
    return (
      <div>
        <br />
        <br />
        value result in undefined
      </div>
    )
  }

  return (
    <div>
      <ProfilesViewBanner isGroup={false} profileName={value.email} />

      <div className={styles.centerButtons}>
        <PreContactBtn userId={id} isContact={value.isContact} />
      </div>
      <div className={styles.centerButtons}>
        <ProfileViewSendMessageBtn id={value._id} nickname={value.email} />
      </div>
    </div>
  )
}

function PreContactBtn({ isContact, userId }: { isContact: boolean; userId: string }) {
  const { loginData } = useLoginDataCtx()

  if (userId === loginData?.id) {
    return null
  }

  if (isContact) {
    return <DeleteUserFromContactsBtn id={userId} />
  } else {
    return <AddUserAsContactBtn id={userId} />
  }
}
