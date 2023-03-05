import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsCtlGetAsMember(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  const groups = await GroupModel.find({
    members: { $in: [decodedToken.payload._id] },
  })

  res.json(groups)
}
