import useSetCurrentChat from "../features/chat/hooks/useSetCurrentChat"

export function ProfileViewSendMessageBtn({
  id,
  nickname,
}: {
  id: string
  nickname: string
}) {
  const setCurrentChat = useSetCurrentChat()

  return (
    <button
      className={"btn"}
      onClick={() => {
        setCurrentChat({ as: "group", id, nickname })
      }}
    >
      Send message
    </button>
  )
}
