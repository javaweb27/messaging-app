import bcrypt from "bcrypt"
import { model, Schema, SchemaTypes } from "mongoose"
import { regexEmail } from "../helps/regex"

const UserSch = new Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v: string) => Boolean(regexEmail.exec(v)) === true,
        message: "Email field: format is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      min: 7,
    },
    contacts: [SchemaTypes.ObjectId],
  },
  { timestamps: true }
)

UserSch.methods.encryptPassword = async function (password: string) {
  if (!password || password.length <= 6) {
    return null
  }

  return await bcrypt.hash(password, 10)
}

export default model("users", UserSch)
