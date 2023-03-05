import { rest } from "msw"
import { NODE_API } from "../../../config"
import { groupsGetAsMemberRes } from "./groupsGetAsMemberRes"
import { groupsGetAsPublic } from "./groupsGetAsPublic"

const API_PREFIX = `${NODE_API}/api/groups`

export const groupHandlers = [
  rest.get(`${API_PREFIX}/all/as-member`, (cli, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([groupsGetAsMemberRes])
    )
  }),
  // groups to discover
  rest.get(`${API_PREFIX}`, (cli, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([groupsGetAsPublic])
    )
  }),
]
