import { render, screen, within } from "@testing-library/react"
import { AllProvidersTesting } from "../../../../test-utils/AllContextsTesting"
import { ChatMessages } from "../ChatMessages"

// this test needs to be refactored
// and test messages of a group
// , the server (like "a user joined the group")
describe("#<ChatMessages />", () => {
  describe("renders a text that says there is no message", () => {
    //
    test("when the current chat couldn't be found", async () => {
      render(
        <AllProvidersTesting
          stateValues={{
            ChatProvider: {
              current: {
                as: "group",
                id: "this id doesn't exist in items",
                nickname: "some nickname",
              },
              items: [], // this is "items"
            },
          }}
        >
          <ChatMessages />
        </AllProvidersTesting>
      )

      const textNoMsg = screen.getByText(/There is no message yet/i)

      expect(textNoMsg).toBeInTheDocument()
    })

    test("when the current chat was found but it does't have no message", async () => {
      const chatId = "this id do exists"

      render(
        <AllProvidersTesting
          stateValues={{
            ChatProvider: {
              current: {
                as: "group",
                id: chatId,
                nickname: "some nickname",
              },
              // there is no message in this chat
              items: [{ messages: [], unreadCount: 0, as: "group", id: chatId }],
            },
          }}
        >
          <ChatMessages />
        </AllProvidersTesting>
      )

      const textNoMsg = screen.getByText(/There is no message yet/i)

      expect(textNoMsg).toBeInTheDocument()
    })
  })

  test("doesn't render a text that says there is no message when the chat has messages", () => {
    const chatId = "this id do exists"

    render(
      <AllProvidersTesting
        stateValues={{
          ChatProvider: {
            current: {
              as: "user",
              id: chatId,
              nickname: "some nickname",
            },
            // there is no message in this chat
            items: [
              {
                messages: [[chatId, "some message"]],
                unreadCount: 0,
                as: "user",
                id: chatId,
              },
            ],
          },
        }}
      >
        <ChatMessages />
      </AllProvidersTesting>
    )

    const textNoMsg = screen.queryByText(/There is no message yet/i)

    expect(textNoMsg).toBeNull()
  })

  test("renders messages of both users", () => {
    const randomId = () => (new Date().getTime() + Math.random()).toString()

    const myData = {
      chatId: randomId(),
      message: "my message 123-",
      email: "my@email.com",
    }

    const othreUserData: typeof myData = {
      chatId: randomId(),
      message: "other user message 456-",
      email: "othreuser@email.com",
    }

    render(
      <AllProvidersTesting
        stateValues={{
          ChatProvider: {
            current: {
              as: "user",
              id: othreUserData.chatId,
              nickname: othreUserData.email,
            },

            items: [
              {
                id: othreUserData.chatId,
                unreadCount: 0,
                as: "user",
                // chat messages with othre user
                messages: [
                  [myData.chatId, myData.message], // my message
                  [othreUserData.chatId, othreUserData.message],
                  // throws an test error when these messages are duplicated
                ],
              },
            ],
          },
          LoginDataProvider: {
            id: myData.chatId,
            email: myData.email,
          },
          ProfilesDataProvider: {
            users: new Map([[othreUserData.chatId, { nickname: othreUserData.email }]]),
            groups: new Map(),
          },
        }}
      >
        <ChatMessages />
      </AllProvidersTesting>
    )

    for (const messageData of [myData, othreUserData]) {
      const isMyMessage = messageData.chatId === myData.chatId

      const nicknameInMsg = isMyMessage ? "me" : messageData.email

      const msgElm = screen
        .getByText<HTMLLIElement>(new RegExp(nicknameInMsg, "i"), { selector: "strong" })
        .closest("li")

      const msgElmWithin = within(msgElm!)

      // nickname of the message
      expect(
        msgElmWithin.getByText(nicknameInMsg, { selector: "strong" })
      ).toBeInTheDocument()

      const myTextMessage = msgElmWithin.getByText((__content, node) => {
        const nodeHasText = node!.textContent === nicknameInMsg + messageData.message

        return nodeHasText
      })

      expect(myTextMessage).toBeInTheDocument()
    }
  })
})
