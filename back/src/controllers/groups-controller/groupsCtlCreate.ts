import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsCreate } from "../../services/groups-services/groupsCreate"

export async function groupsCtlCreate(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const newGroup = await groupsCreate(decodedToken, cli.body)

    res.status(201).json({ data: newGroup })
  } catch (error: any) {
    if (error.message === "404") {
      res.status(400).json({ message: "this group does not exist" })
    } else if (error.errors) {
      res.status(400).json(error.errors)
    } else {
      res.status(500).json(error)
    }
  }
}
