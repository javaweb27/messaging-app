import { NextFunction, Request, Response } from "express"
import { AuthJwtDecoded, verifyAuthJwt } from "../lib/createAuthJwt"

type middleware = (cli: Request, res: Response, next: NextFunction) => Promise<void>
/**
 * middleware
 *
 * verifies the jwt from cli.headers["authorization"]
 * and saves it in res.locals.decodedToken
 */
export const mwGetAuthJwt: middleware = async (cli, res, next) => {
  const bearer = cli.headers["authorization"] as string | undefined

  if (!bearer) {
    console.log("REST-API: there is not auth jwt")

    res.status(401).json({ message: "auth jwt is required" })
    return
  }

  const token = bearer.split(" ")[1]

  let decodedToken

  try {
    decodedToken = (await verifyAuthJwt(token)) as AuthJwtDecoded

    res.locals.decodedToken = decodedToken

    next()
  } catch {
    res.status(401).json({
      message: "wrong jwt",
    })
  }
}
