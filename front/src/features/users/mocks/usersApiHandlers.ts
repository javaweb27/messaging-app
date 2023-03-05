import { rest } from "msw"
import { NODE_API } from "../../../config"
import { usersGetAsOnline } from "./usersGetAsOnline"

export const usersApiHandlers = [
  rest.get(`${NODE_API}/api/users/online`, (cli, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersGetAsOnline))
  }),
  rest.get(`${NODE_API}/api/contacts`, (cli, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersGetAsOnline))
  }),
]
