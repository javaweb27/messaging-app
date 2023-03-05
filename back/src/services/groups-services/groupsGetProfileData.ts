import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsGetProfileData(
  decodedToken: AuthJwtDecoded,
  groupId: string
) {
  const group = await GroupModel.findById(groupId)

  if (!group) {
    throw new Error("404")
  }

  return {
    _id: group._id.toString(),
    name: group.name,
    ownerUserId: group.ownerUserId,
    requestToJoin: group.requestToJoin,
    isRequestSent: group.requests.some(
      objId => objId.toString() === decodedToken.payload._id
    ),
    isMember: group.members.some(objId => objId.toString() === decodedToken.payload._id),
  }
}
