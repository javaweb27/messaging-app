import { Request, Response } from "express"
import bcrypt from "bcrypt"
import UserModel from "../../models/UserModel"

export async function authRegister(cli: Request, res: Response) {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(cli.body.password, salt)

    //create new user
    const newUser = new UserModel({
      username: cli.body.username,
      email: cli.body.email,
      password: encryptedPassword,
    })

    //save user and respond
    const user = await newUser.save()

    res.status(201).json(user)
  } catch (error: any) {
    console.error(error)

    if (error.code === 11000) {
      res.status(403).json("this email is already being used")
    } else {
      res.status(500).json(error)
    }
  }
}
