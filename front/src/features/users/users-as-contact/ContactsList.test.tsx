import { render, screen, waitFor, within } from "@testing-library/react"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { usersGetAsContact } from "../mocks/usersGetAsContact"
import { ContactsList } from "./ContactsList"

/*
  missing tests

  opens a chat when user clicks on a contact
 */

describe("<ContactsList />", () => {
  test("renders a loading text on initial render", () => {
    render(
      <AllProvidersTesting>
        <ContactsList />
      </AllProvidersTesting>
    )

    const loadingTextEml = screen.getByText(/Loading.../i)

    expect(loadingTextEml).toBeInTheDocument()
  })

  test("after fetching data stops render a loading text", async () => {
    render(
      <AllProvidersTesting>
        <ContactsList />
      </AllProvidersTesting>
    )

    await waitFor(() => {
      const loadingTextEml = screen.queryByText(/Loading.../i)
      expect(loadingTextEml).toBeNull()
    })
  })

  test("after fetching data renders the contacts", async () => {
    render(
      <AllProvidersTesting>
        <ContactsList />
      </AllProvidersTesting>
    )

    for (const contactData of usersGetAsContact) {
      const contactElm = (
        await screen.findByText(new RegExp(contactData.email, "i"))
      ).closest("li")

      within(contactElm!).getByText((__content, node) => {
        return node!.textContent === contactData.email
      })
    }
  })
})
