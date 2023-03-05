import { render, screen, waitFor, within } from "@testing-library/react"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { groupsGetAsPublic } from "../mocks/groupsGetAsPublic"
import { GroupsToDiscover } from "./GroupsToDiscover"

/*
  missing tests
  
  svg icon when a group requires request
 */

describe("<GroupsToDiscover />", () => {
  test("shows a loading text on initial render", () => {
    render(
      <AllProvidersTesting>
        <GroupsToDiscover />
      </AllProvidersTesting>
    )

    const textLoadingElm = screen.getByText(/LOADING.../i)

    expect(textLoadingElm).toBeInTheDocument()
  })

  test("after fetching data the loading text is no longer rendered", async () => {
    render(
      <AllProvidersTesting>
        <GroupsToDiscover />
      </AllProvidersTesting>
    )

    await waitFor(() => {
      const textLoadingElm = screen.queryByText(/LOADING.../i)

      expect(textLoadingElm).not.toBeInTheDocument()
    })
  })

  test("after fetching data the list of groups is rendered", async () => {
    render(
      <AllProvidersTesting>
        <GroupsToDiscover />
      </AllProvidersTesting>
    )

    const groupElm = (
      await screen.findByText(new RegExp(groupsGetAsPublic.name, "i"))
    ).closest("li")

    const withinGroupElm = within(groupElm!)

    withinGroupElm.getByText<HTMLLIElement>((__content, node) => {
      return node!.textContent === groupsGetAsPublic.name
    })
  })
})
