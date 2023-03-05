import styles from "./AuthForm.module.scss"

export function AuthErrorMsg({
  children,
  isValid,
  isFormEmpty,
}: {
  children: React.ReactNode
  isValid: boolean
  isFormEmpty: boolean
}) {
  return (
    <p
      className={
        isFormEmpty
          ? styles.inputMsgInvisible
          : isValid
          ? styles.inputMsgSuccess
          : styles.inputMsgError
      }
    >
      {isValid ? "Valid" : children}
    </p>
  )
}
