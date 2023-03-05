import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"
import UserModel from "../../models/UserModel"

export async function groupsGetUsersFromRequests(
  decodedToken: AuthJwtDecoded,
  groupId: string
) {
  const group = await GroupModel.findById(groupId, {
    members: 0,
  })

  if (!group) {
    throw new Error("404")
  }

  const isAdmin = group.ownerUserId.toString() === decodedToken.payload._id

  if (isAdmin === false) {
    throw new Error("403")
  }

  const users = await UserModel.find(
    { _id: { $in: group.requests } },
    { password: 0, contacts: 0 }
  )

  return {
    users,
  }
}
