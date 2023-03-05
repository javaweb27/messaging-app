import { Request, Response } from "express"
import bcrypt from "bcrypt"
import UserModel from "../../models/UserModel"
import { createAuthJwt } from "../../lib/createAuthJwt"

export async function authLogin(cli: Request, res: Response) {
  try {
    const user = await UserModel.findOne({ email: cli.body.email })

    if (!user) {
      return res.status(404).json("user not found")
    }

    const validPassword = await bcrypt.compare(cli.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json("wrong password")
    }

    const authToken = await createAuthJwt(user)

    res.status(201).json(authToken)
  } catch (error) {
    res.status(500).json(error)
  }
}
