import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsGetMembers } from "../../services/groups-services/groupsGetMembers"

export async function groupsCtlGetMembers(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const membersData = await groupsGetMembers(decodedToken, cli.params.id)

    res.json(membersData)
  } catch (error: any) {
    if (error.message === "404") {
      res
        .status(Number(error.message))
        .json({ message: "cannot get members of a group that does not exist" })
    } else if (error.kind === "ObjectId" && error.name === "CastError") {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}
