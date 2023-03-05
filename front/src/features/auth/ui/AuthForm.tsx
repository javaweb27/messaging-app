import styles from "./AuthForm.module.scss"
import { HiOutlineEyeOff, HiEye } from "react-icons/hi"
import { ChangeEvent, useState } from "react"
import { useAuthForm } from "../hooks/useAuthForm"
import { AuthErrorMsg } from "./AuthErrorMsg"

interface AuthFormProps {
  submitForm: (form: any) => void
  submitBtnText: string
}

export function AuthForm({ submitForm, submitBtnText }: AuthFormProps) {
  const { form, setForm, invalidFields, isFormEmpty } = useAuthForm()
  const [hiddenPass, setHiddenPass] = useState(true)

  const isFormValid = invalidFields.size === 0

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(c => ({ ...c, [e.target.name]: e.target.value }))
  }

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault()

        if (isFormValid === true) {
          submitForm(form)
        }
      }}
    >
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        className={`${styles.input} ${
          invalidFields.has("email") && !isFormEmpty ? styles.error : ""
        }`}
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <AuthErrorMsg isValid={!invalidFields.has("email")} isFormEmpty={isFormEmpty}>
        {invalidFields.get("email")}
      </AuthErrorMsg>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <div className={styles.inputWithIcon}>
        <input
          className={`${styles.input} ${
            invalidFields.has("password") && !isFormEmpty ? styles.error : ""
          }`}
          type={hiddenPass ? "password" : "text"}
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          className={styles.btnIcon}
          type="button"
          onClick={() => setHiddenPass(hidden => !hidden)}
        >
          {hiddenPass ? (
            <HiEye className={styles.icon} />
          ) : (
            <HiOutlineEyeOff className={styles.icon} />
          )}
        </button>
      </div>
      <AuthErrorMsg isValid={!invalidFields.has("password")} isFormEmpty={isFormEmpty}>
        {invalidFields.get("password")}
      </AuthErrorMsg>
      <button
        disabled={isFormValid === false}
        className={`${styles.btnSubmit} ${isFormValid ? "" : styles.btnSubmitDisabled}`}
        type="submit"
      >
        {submitBtnText}
      </button>
    </form>
  )
}
