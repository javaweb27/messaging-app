import { connect } from "mongoose"
import { MONGODB_URI } from "./config"

export async function connectMongoDB(afterConnect: () => void) {
  console.log("connecting to mongodb...")

  try {
    await connect(MONGODB_URI)
    console.log("connection to mongodb ok")
    afterConnect()
  } catch (error) {
    console.error("error when connect to mongodb:", error)
  }
}
