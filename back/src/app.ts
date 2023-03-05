import cors from "cors"
import express from "express"
import http from "http"
import { CORS_URL } from "./config"
import { authRoute } from "./routes/auth"
import { contactsRoute } from "./routes/contacts"
import { groupsRoute } from "./routes/groups"
import { usersRoute } from "./routes/users"

export const expressApp = express()

export const httpApp = http.createServer(expressApp)

// expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())
expressApp.use(
  cors({
    origin: [CORS_URL],
  })
)

expressApp.use("/api/auth", authRoute)
expressApp.use("/api/users", usersRoute)
expressApp.use("/api/contacts", contactsRoute)
expressApp.use("/api/groups", groupsRoute)
