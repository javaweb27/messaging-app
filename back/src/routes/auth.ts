import { Router } from "express"
import { authRegister } from "../controllers/auth-controller/authRegister"
import { authLogin } from "../controllers/auth-controller/authLogin"

const router = Router()

/*
  creating a new user
 */
router.post("/register", authRegister)

/*
  loggin in user, sending token (jwt)
 */
router.post("/login", authLogin)

export { router as authRoute }
