import { useNavigate } from "react-router-dom"
import {
  getLoginDataFromToken,
  useLoginDataCtx,
} from "../../../global-state-context/login-data-ctx/LoginDataCtx"
import { fetchJson } from "../../../lib/fetchJson"
import { socket } from "../../../socket"

//custom hook useCallFetch
export function useAuthLogin() {
  const { setLoginData } = useLoginDataCtx()
  const navigate = useNavigate()

  return async (form: any) => {
    let res

    try {
      res = await fetchJson(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
      })
    } catch (error: any) {
      console.error(error.message)

      return
    }

    if (!res.ok) {
      // console.log("res.ok is", res.ok)

      return
    }

    // console.log("res.ok is", res.ok)

    const authToken = await res.json()

    sessionStorage.setItem("authJwt", authToken)

    setLoginData(getLoginDataFromToken())

    navigate("/")
    socket.disconnect()
    socket.connect()
  }
}

export function useAuthRegister() {
  const navigate = useNavigate()

  return async (form: any) => {
    let res

    try {
      res = await fetchJson(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(form),
      })
    } catch (error: any) {
      console.error(error.message)

      return
    }

    if (!res.ok) {
      // console.log("res.ok is", res.ok)

      return
    }

    // console.log("res.ok is", res.ok)

    // const json = await res.json()

    // console.log(json)

    navigate("/login")

    return null
  }
}
