import { Request, Response } from "express"
import { AuthJwtDecoded } from "../../lib/createAuthJwt"
import { contactsGet } from "../../services/contacts-services/contactsGet"

export async function getContacts(cli: Request, res: Response) {
  const decodedToken = res.locals.decodedToken as AuthJwtDecoded

  try {
    const contacts = await contactsGet(decodedToken)

    res.json(contacts)
  } catch (error: any) {
    if (error.message === 409) {
      res.status(409).json({
        message: "cannot get contacts of a user that does not exist",
      })
    } else {
      res.status(500).json(error)
    }
  }
}
