import { createContext, PropsWithChildren, useContext, useState } from "react"
import jwtDecode from "jwt-decode"

interface LoginDataCtx {
  loginData: LoginDataCtxState
  setLoginData: React.Dispatch<React.SetStateAction<LoginDataCtxState>>
}

type LoginDataCtxState = null | {
  email: string
  id: string
}

export const getLoginDataFromToken = () => {
  const token = sessionStorage.getItem("authJwt")
  if (!token) {
    return null
  }

  const decoded = jwtDecode<{
    iat: number
    payload: {
      createdAt: string
      contacts: string[]
      updatedAt: string
      email: string
      password: string
      __v: number
      _id: string
    }
  }>(token)

  const data = {
    email: decoded.payload.email,
    id: decoded.payload._id,
  }

  return data
}

const initialState: LoginDataCtxState = getLoginDataFromToken()

const LoginDataContext = createContext(undefined! as LoginDataCtx)

export const useLoginDataCtx = () => useContext(LoginDataContext)

interface LoginDataProviderProps extends Required<PropsWithChildren> {
  testStateValue?: LoginDataCtxState
}

export function LoginDataProvider({ children, testStateValue }: LoginDataProviderProps) {
  const [loginData, setLoginData] = useState(testStateValue ?? initialState)

  return (
    <LoginDataContext.Provider value={{ loginData, setLoginData } as LoginDataCtx}>
      {children}
    </LoginDataContext.Provider>
  )
}
