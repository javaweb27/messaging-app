import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { GroupsCreateOne } from "./GroupsCreateOne"

// missing tests
// submit btn of the form
// click submit btn
// respones of fetch after create group
// how does the ures now that group was created ?

describe("<GroupsCreateOne />", () => {
  //
  test("render button for open form for creating a group", () => {
    render(<GroupsCreateOne />, { wrapper: AllProvidersTesting })

    screen.getByText(/Create group/i, { selector: "button" })
  })

  describe("after click on the button for create a group", () => {
    let btnCreate: HTMLButtonElement

    beforeEach(() => {
      render(<GroupsCreateOne />, { wrapper: AllProvidersTesting })

      btnCreate = screen.getByText(/Create group/i)
    })

    test("button text changes to close", async () => {
      await userEvent.click(btnCreate)

      expect(screen.queryByText(/Create group/i)).toBeNull()
      expect(screen.queryByText(/Close/i)).toBeInTheDocument()
    })

    test("form is showed with require request as true and empty group name input", async () => {
      await userEvent.click(btnCreate)

      // label
      screen.getByText(/Name of group/i)

      // group name input with empty value
      const groupNameInput = screen.getByPlaceholderText<HTMLInputElement>("name")

      expect(groupNameInput.value).toHaveLength(0)

      // input can change its value
      const groupName = Math.random() + ""

      await userEvent.type(groupNameInput, groupName)

      expect(groupNameInput.value).toBe(groupName)
    })
  })
})
