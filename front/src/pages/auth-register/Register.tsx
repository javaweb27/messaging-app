import styles from "./Register.module.scss"
import { useAuthRegister } from "../../features/auth/hooks/fetchAuth"
import { AuthForm } from "../../features/auth/ui/AuthForm"
import { Link } from "react-router-dom"

export default function Register() {
  const register = useAuthRegister()

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Create account</h1>
      <AuthForm submitForm={register} submitBtnText="Create account" />
      <p>Already with account?</p>
      <Link to={"/login"} className={styles.link}>
        Log in
      </Link>
    </section>
  )
}
