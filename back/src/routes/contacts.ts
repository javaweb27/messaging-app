import { Router } from "express"
import { createContact } from "../controllers/contacts-controller/createContact"
import { deleteContact } from "../controllers/contacts-controller/deleteContact"
import { getContacts } from "../controllers/contacts-controller/getContacts"
import { mwGetAuthJwt } from "../middlewares/mwGetAuthJwt"

const router = Router()

// getting all contacts of a user
router.get("/", mwGetAuthJwt, getContacts)

// adding a user to contact list
router.post("/", mwGetAuthJwt, createContact)

// deleting a user from contact list
router.delete("/", mwGetAuthJwt, deleteContact)

export { router as contactsRoute }
