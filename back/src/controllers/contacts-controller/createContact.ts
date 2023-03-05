import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import UserModel from "../../models/UserModel"

export async function createContact(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  const User = await UserModel.findById(decodedToken.payload._id)

  if (!User) {
    return res.status(409).json({
      message: "cannot add new contacts to a user that does not exist",
    })
  }

  const newContactUserId = cli.body.userId

  if (!newContactUserId) {
    return res.status(400).json({
      message: "userId of new contact is required",
    })
  }

  // user cannot be a contact of itself
  if (User._id.toString() === newContactUserId) {
    return res.status(409).json({ message: "you cannot be in your own contact list" })
  }

  const UserToBeAContact = await UserModel.findById(newContactUserId, {
    password: 0,
  })

  if (!UserToBeAContact) {
    return res.status(409).json({
      message: "a user that does not exist cannot be a contact",
    })
  }

  // comprobing if they are already a contact
  const requesterIsContact = User.contacts.some(
    ({ _id }) => _id.toString() === UserToBeAContact._id.toString()
  )

  const targetIsContact = UserToBeAContact.contacts.some(
    ({ _id }) => _id.toString() === User._id.toString()
  )

  if (requesterIsContact && targetIsContact) {
    return res.status(409).json({ message: "this user is already in your contact list" })
  }

  User.contacts.push(UserToBeAContact._id)
  UserToBeAContact.contacts.push(User._id)

  await Promise.all([User.save(), UserToBeAContact.save()])

  res.status(201).json(UserToBeAContact)
}
