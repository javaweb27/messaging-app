import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import GroupModel from "../../models/GroupModel"

export async function groupsCtlGetRequestsThey(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  const groups = await GroupModel.find(
    {
      ownerUserId: decodedToken.payload._id,
    },
    { name: 1, requests: 1 }
  )

  res.json(groups)
}
