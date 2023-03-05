import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsRemoveMember(
  decodedToken: AuthJwtDecoded,
  groupId: string,
  userId: string
) {
  const group = await GroupModel.findById(groupId)

  if (!group) {
    throw new Error("404")
  }

  // verifying that user is owner the group (admin)
  if (group.ownerUserId.toString() !== decodedToken.payload._id) {
    throw new Error("403")
  }

  // removing userId from the group
  group.members = group.members.filter(objId => {
    return objId.toString() !== userId
  })

  await group.save()
}
