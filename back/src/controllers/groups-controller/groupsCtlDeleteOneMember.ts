import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsRemoveMember } from "../../services/groups-services/groupsRemoveMember"

export async function groupsCtlDeleteOneMember(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    await groupsRemoveMember(decodedToken, cli.body.groupId, cli.body.userId)

    res.sendStatus(200)
  } catch (e) {
    const error = e as Error

    if (error.message === "404") {
      res.status(Number(error.message)).json({
        message: "cannot remove a user form a group that does not exist",
      })
    } else if (error.message === "403") {
      res
        .status(Number(error.message))
        .json({ message: "only an admin can delete its own groups" })
    } else {
      res.status(500).json(error)
    }
  }
}
