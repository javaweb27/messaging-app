import styles from "./SideLeftHeader.module.scss"
import { useNavigate } from "react-router-dom"
import { CgMenu } from "react-icons/cg"
import { socket } from "../../../socket"
import { useLoginDataCtx } from "../../../global-state-context/login-data-ctx/LoginDataCtx"

/**
 * Hamburguer button for main menu
 *
 * show a menu with general options
 */
export function SideLeftHeaderMainMenu() {
  const navigate = useNavigate()
  const { setLoginData } = useLoginDataCtx()

  const logout = () => {
    console.log("loggin out")

    sessionStorage.removeItem("authJwt")
    setLoginData(null)
    socket.disconnect()
    navigate("/login")
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          height: "100%",
          verticalAlign: "middle",
          padding: ".64rem",
        }}
      >
        <CgMenu style={{ fontSize: "27px" }} />
      </button>
      {/* this ul is absolute to div */}
      <ul className={styles.list}>
        <li style={{ whiteSpace: "nowrap" }}>
          <button onClick={logout}>Log out</button>
        </li>
      </ul>
    </div>
  )
}
