import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsDelete } from "../../services/groups-services/groupsDelete"

export async function groupsCtlDelete(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const deletedGroup = await groupsDelete(decodedToken, cli.body.groupId)

    res.status(200).json({ data: deletedGroup })
  } catch (e) {
    const error = e as Error

    if (error.message === "404") {
      res
        .status(Number(error.message))
        .json({ message: "cannot delete a group that does not exist" })
    } else if (error.message === "403") {
      res
        .status(Number(error.message))
        .json({ message: "only an admin can delete its own groups" })
    } else {
      res.status(500).json(error)
    }
  }
}
