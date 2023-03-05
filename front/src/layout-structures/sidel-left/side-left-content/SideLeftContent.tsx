import Discover from "../../../features-integrations/Discover"
import { Requests } from "../../../features-integrations/Requests"
import { ChatList } from "../../../features/chat/chat-list/ChatList"
import { ContactsList } from "../../../features/users/users-as-contact/ContactsList"
import GroupsContainer from "../../../features/groups/GroupsContainer"
import { useSideLeftContentCtx } from "./SideLeftContentContext"

export const SideLeftContentData = {
  Chats: ChatList,
  Groups: GroupsContainer,
  Contacts: ContactsList,
  Discover: Discover,
  Requests: Requests,
}

/**
 * this content is dynamic?
 *
 * chat list
 *
 * contacts
 *
 * discover: users? groups?
 */
export function SideLeftContent() {
  const [currentContent, _setCurrentContent] = useSideLeftContentCtx()

  // const Component = SideLeftContentData.find(([option]) => option === currentContent)?.[1]
  const Component = SideLeftContentData[currentContent]

  return (
    <div>
      <Component />
    </div>
  )
}
