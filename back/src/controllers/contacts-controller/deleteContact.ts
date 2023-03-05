import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import UserModel from "../../models/UserModel"

export async function deleteContact(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  const userId = cli.body.userId as string | undefined

  if (!userId) {
    return res.status(400).json({
      message: "userId of contact is required",
    })
  }

  const User = await UserModel.findById(decodedToken.payload._id)

  if (!User) {
    return res.status(409).json({
      message: "cannot remove a contact from a user that does not exist",
    })
  }

  const UserToRemove = await UserModel.findById(userId)

  // filter even if the client sends an unknown userId
  User.contacts = User.contacts.filter(user => {
    return user._id.toString() !== userId
  })

  if (UserToRemove) {
    // removing from contact list only when UserToRemove exists
    UserToRemove.contacts = User.contacts.filter(user => {
      return user._id.toString() !== User._id.toString()
    })
  }

  await Promise.all([User.save(), UserToRemove?.save()])

  res.status(200).json({ message: "a contact has been deleted correctly" })
}
