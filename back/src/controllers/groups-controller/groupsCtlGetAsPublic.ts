import { Request, Response } from "express"
import GroupModel from "../../models/GroupModel"

export async function groupsCtlGetAsPublic(cli: Request, res: Response) {
  const groups = await GroupModel.find({})

  res.json(groups)
}
