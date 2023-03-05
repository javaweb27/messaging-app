import { FaUserCircle, FaUsers } from "react-icons/fa"

/**
 * shows photo and name of the profile
 */
export function ProfilesViewBanner({
  isGroup,
  profileName,
}: {
  isGroup: boolean
  profileName: string
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "60px" }}>
        {isGroup ? <FaUsers /> : <FaUserCircle />}
      </div>
      <h1
        style={{ display: "flex", justifyContent: "center", fontSize: "2.6rem" }}
        className={"styles.groupName"}
      >
        {profileName}
      </h1>
    </>
  )
}
