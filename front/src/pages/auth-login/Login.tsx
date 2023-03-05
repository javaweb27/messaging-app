import styles from "../auth-register/Register.module.scss"
import { useAuthLogin } from "../../features/auth/hooks/fetchAuth"
import { AuthForm } from "../../features/auth/ui/AuthForm"
import { Link } from "react-router-dom"

export default function Login() {
  const login = useAuthLogin()

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Login</h1>
      <AuthForm submitForm={login} submitBtnText="Log in" />
      <p>Don't have an account?</p>
      <Link to={"/register"} className={styles.link}>
        Create account
      </Link>
    </section>
  )
}
