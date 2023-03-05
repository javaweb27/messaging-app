import { Request, Response } from "express"
import UserModel from "../../models/UserModel"
import { OnlineUsers } from "../../z-sio-state/OnlineUsers"

export async function getUsersAsOnline(cli: Request, res: Response) {
  const ids = OnlineUsers.items.map(user => user.userId)
  const users = await UserModel.find({ _id: { $in: ids } }, { email: 1 })

  res.json(users)
}
