import { Router } from "express"
import { getUserProfile } from "../controllers/users-controller/getUserProfile"
import { getUsersAsOnline } from "../controllers/users-controller/getUsersAsOnline"
import { mwGetAuthJwt } from "../middlewares/mwGetAuthJwt"
import UserModel from "../models/UserModel"

const router = Router()

// getting all users
router.get("/", async (cli, res) => {
  const users = await UserModel.find({}, { password: 0 })

  res.json(users)
})

// getting all online users
router.get("/online", getUsersAsOnline)

// getting one user
router.get("/profile/:id", mwGetAuthJwt, getUserProfile)

export { router as usersRoute }
