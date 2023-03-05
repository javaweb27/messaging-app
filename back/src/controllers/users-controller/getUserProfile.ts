import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import UserModel from "../../models/UserModel"

export async function getUserProfile(cli: Request, res: Response) {
  console.log("\n-----")
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    console.log("finding user by id " + cli.params.id)

    const User = await UserModel.findById(cli.params.id)

    if (!User) {
      res.status(404).json(User)
      return
    }

    const isContact = User.contacts.some(
      user => user._id.toString() === decodedToken.payload._id
    )

    res.json({
      _id: User._id.toString(),
      email: User.email,
      password: User.password,
      isContact,
    })
  } catch (error: any) {
    console.log("getting one user ERROR")
    if (error.kind === "ObjectId" && error.name === "CastError") {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}
