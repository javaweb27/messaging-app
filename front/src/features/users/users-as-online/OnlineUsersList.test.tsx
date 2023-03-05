import { render, screen, waitFor, within } from "@testing-library/react"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { usersGetAsOnline } from "../mocks/usersGetAsOnline"
import { ChatOnlineUsersList } from "./OnlineUsersList"
/*
  missing tests

  when click a user opens its profile
*/
describe("<OnlineUsersList /> (users-as-online)", () => {
  test("renders a loading text on initial render", () => {
    render(
      <AllProvidersTesting>
        <ChatOnlineUsersList />
      </AllProvidersTesting>
    )

    const loadingTextElm = screen.getByText(/Loading.../i)
    expect(loadingTextElm).toBeInTheDocument()
  })

  test("after fetching data stops render a loading text", async () => {
    render(
      <AllProvidersTesting>
        <ChatOnlineUsersList />
      </AllProvidersTesting>
    )

    const loadingTextElm = screen.getByText(/Loading.../i)

    await waitFor(() => {
      expect(loadingTextElm).not.toBeInTheDocument()
    })
  })

  test("after fetching data renders online users", async () => {
    render(
      <AllProvidersTesting>
        <ChatOnlineUsersList />
      </AllProvidersTesting>
    )

    for (const userData of usersGetAsOnline) {
      const userElm = (await screen.findByText(new RegExp(userData.email, "i"))).closest(
        "li"
      )

      const withinUserElm = within(userElm!)

      withinUserElm.getByText((__content, node) => {
        return node!.textContent === userData.email
      })
    }
  })
})
