import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsDelete(decodedToken: AuthJwtDecoded, groupId: string) {
  // verify that the group belogs to ures

  //creating group
  console.log("deleting group in db")

  const group = await GroupModel.findById(groupId)

  if (!group) {
    throw new Error("404")
  }

  // verifying that user is owner the group
  if (group.ownerUserId.toString() !== decodedToken.payload._id) {
    throw new Error("403")
  }

  const result = await GroupModel.deleteOne({ _id: group._id })

  console.log("a group has been deleted")
  console.log("result:")
  console.log(result)
}
