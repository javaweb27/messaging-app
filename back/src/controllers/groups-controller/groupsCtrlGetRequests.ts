import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsGetUsersFromRequests } from "../../services/groups-services/groupsGetUsersFromRequests"

export async function groupsCtrlGetRequests(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const users = await groupsGetUsersFromRequests(decodedToken, cli.params.id)

    res.json(users)
  } catch (error: any) {
    if (error.message === "404") {
      res.status(404).json({ message: "this group does not exist" })
    } else if (error.message === "403") {
      res.status(403).json({ message: "only the admin can get requests of the group" })
    }

    if (error.kind === "ObjectId" && error.name === "CastError") {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}
