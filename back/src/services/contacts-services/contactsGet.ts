import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import UserModel from "../../models/UserModel"

export async function contactsGet(decodedToken: AuthJwtDecoded) {
  const User = await UserModel.findById(decodedToken.payload._id)

  if (!User) {
    throw new Error("409")
  }

  // sending empty array when list of contacts is empty
  if (User.contacts.length === 0) {
    return []
  }

  const contacts = await Promise.all(
    User.contacts.map(contactUserId => {
      return UserModel.findById(contactUserId, { password: 0 })
    })
  )

  return contacts
}
