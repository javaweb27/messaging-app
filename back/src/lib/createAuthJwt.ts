import jwt from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

export async function createAuthJwt(payload: any) {
  return jwt.sign(
    { payload },
    JWT_TOKEN_KEY
    // { expiresIn: "300s" },
  )
}

export interface AuthJwtDecoded {
  payload: {
    _id: string
    email: string
    password: string
    contacts: []
    createdAt: string
    updatedAt: string
    __v: number
  }
  iat: number
}
/**
 * verifies a token of jsonwebtoken
 *
 * throws an exeption when when token in invalid
 *
 * @returns decoded token or an Error
 */
export async function verifyAuthJwt(token: string) {
  return jwt.verify(token, JWT_TOKEN_KEY)
}
