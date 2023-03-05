import { render, screen, waitFor, within } from "@testing-library/react"
import { rest } from "msw"
import { NODE_API } from "../../../config"
import { server } from "../../../mocks/server"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { groupsGetAsMemberRes } from "../mocks/groupsGetAsMemberRes"
import { ChatGroupAsMemberList } from "./GroupsAsMember"

const name = groupsGetAsMemberRes.name
const API_PREFIX = `${NODE_API}/api/groups`

describe("<GroupsAsMember /> (ChatGroupAsMemberList)", () => {
  test("shows a loading message on initial render", async () => {
    render(<ChatGroupAsMemberList />, { wrapper: AllProvidersTesting })

    screen.getByText(/LOADING.../i)
  })

  test("stops showing a loading message after fetching groups data", async () => {
    render(<ChatGroupAsMemberList />, { wrapper: AllProvidersTesting })

    await waitFor(() => {
      return expect(screen.queryByText(/LOADING.../i)).toBeNull()
    })
  })

  test("shows a message when there is no group in the list", async () => {
    server.use(
      rest.get(`${API_PREFIX}/all/as-member`, (cli, res, ctx) => {
        return res(
          // Respond with a 200 status code
          ctx.status(200),
          ctx.json([])
        )
      })
    )

    render(<ChatGroupAsMemberList />, { wrapper: AllProvidersTesting })

    await screen.findByText(/You haven't joined any group yet/i)
  })

  test("renders list of groups where user is a member after fetching", async () => {
    render(<ChatGroupAsMemberList />, {
      wrapper: AllProvidersTesting,
    })

    const groupElm = (await screen.findByText(/name/i)).closest("li")
    const withinListItem = within(groupElm!)

    await withinListItem.findByText((__content, node) => {
      return node!.textContent === name
    })
  })
})
