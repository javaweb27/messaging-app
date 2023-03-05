import { useState } from "react"
import { regex } from "../../../helps/regex"

const validator = {
  email: (value: string) => !!regex.email.exec(value) && value.length < 50,
  password: (value: string) => value.length > 6 && value.length < 50,
}

export function useAuthForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const invalidFields = new Map<keyof typeof form, string>()
  const isFormEmpty = !Object.values(form).some(val => val !== "")

  if (!validator.email(form.email)) {
    invalidFields.set("email", "Email format must must be like: some@example.com")
  }
  if (!validator.password(form.password)) {
    invalidFields.set(
      "password",
      "Password must be longer than 6 characters and less than 50"
    )
  }

  console.table(invalidFields)

  return {
    form,
    setForm,
    invalidFields,
    isFormEmpty,
  }
}
