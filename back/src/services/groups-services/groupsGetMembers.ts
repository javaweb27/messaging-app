import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"
import UserModel from "../../models/UserModel"

export async function groupsGetMembers(decodedToken: AuthJwtDecoded, groupId: string) {
  const group = await GroupModel.findById(groupId)

  if (!group) {
    throw new Error("404")
  }

  const members = await UserModel.find(
    { _id: { $in: group.members } },
    { password: 0, contacts: 0 }
  )

  return {
    members,
    isAdmin: group.ownerUserId.toString() === decodedToken.payload._id,
  }
}
