import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { groupsGetProfileData } from "../../services/groups-services/groupsGetProfileData"

export async function groupsCtlGetProfile(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const groupProfile = await groupsGetProfileData(decodedToken, cli.params.id)

    res.json(groupProfile)
  } catch (error: any) {
    if (error.message === "404") {
      res.status(404).json({ message: "group is 404" })
    } else if (error.kind === "ObjectId" && error.name === "CastError") {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}
