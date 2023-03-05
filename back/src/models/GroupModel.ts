// import bcrypt from "bcrypt"
import { model, Schema, SchemaTypes } from "mongoose"
// import { regexEmail } from "../helps/regex"

// interface GroupSchMethods {
//   isAdmin: (userId: string) => boolean
// }

const GroupSch = new Schema(
  {
    // automatic _id
    name: {
      type: String,
      required: true,
      max: [50, "name of group can't be longer than 50 characters"],
    },
    members: {
      type: [SchemaTypes.ObjectId],
      required: true,
    },
    ownerUserId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    requestToJoin: {
      type: Boolean,
      required: true,
    },
    requests: {
      type: [SchemaTypes.ObjectId],
      required: true,
    },
  },
  { timestamps: true }
)

// gets types of "first param" of schema
// type GroupSchT = InferSchemaType<typeof GroupSch>

// type SchemaExtended = Schema<GroupSchT, {}, Readonly<SchemaExtended["methods"]>>

export default model("groups", GroupSch)
