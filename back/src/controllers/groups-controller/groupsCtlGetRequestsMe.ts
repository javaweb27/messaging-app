import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsCtlGetRequestsMe(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  const groups = await GroupModel.find(
    {
      requests: { $in: decodedToken.payload._id },
    },
    { name: 1 }
  )

  res.json(groups)
}
