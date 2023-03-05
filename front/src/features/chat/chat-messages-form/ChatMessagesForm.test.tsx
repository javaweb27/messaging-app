import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AllProvidersTesting } from "../../../test-utils/AllContextsTesting"
import { ChatMessagesForm } from "./ChatMessagesForm"

describe("#ChatSubmitForm changes to ChatMessagesForm", () => {
  beforeEach(() => {
    render(
      <AllProvidersTesting>
        <ChatMessagesForm />
      </AllProvidersTesting>
    )
  })

  test("renders submit button and it is disabled because chatCtx.name is null or empty string", () => {
    const submitBtn = screen.getByText("submit")

    expect(submitBtn).toBeDisabled()
    expect(submitBtn).toBeDefined()
  })

  test("renders textarea input with empty value", () => {
    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>(/write someting/i)

    expect(textarea).toBeDefined()
    expect(textarea.value).toBe("")
  })

  test("value of textarea input changes", () => {
    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>(/write someting/i)

    const value = `testing some text 123`
    fireEvent.change(textarea, { target: { value } })

    expect(textarea.value).toBe(value)
  })

  test("value of textarea input changes", async () => {
    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>(/write someting/i)

    const value = `testing some text 123`

    // fireEvent.change(textarea, { target: { value } })
    await userEvent.type(textarea, value)

    expect(textarea.value).toBe(value)
  })
})
