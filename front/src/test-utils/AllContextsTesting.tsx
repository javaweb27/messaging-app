import { PropsWithChildren } from "react"
import { ChatProvider } from "../features/chat/context/ChatContext"
import { LoginDataProvider } from "../global-state-context/login-data-ctx/LoginDataCtx"
import { ProfilesDataProvider } from "../global-state-context/profiles-data-ctx/ProfilesDataContext"
import { SideRightProvider } from "../layout-structures/side-right/SideRightContext"

const allProviders = {
  ChatProvider,
  LoginDataProvider,
  ProfilesDataProvider,
  SideRightProvider,
}

type AllProviders = typeof allProviders

type AllProvidersKeys = keyof AllProviders

interface AllProvidersTestingProps extends Required<PropsWithChildren> {
  stateValues?: Partial<{
    [key in AllProvidersKeys]: Parameters<AllProviders[key]>[0]["testStateValue"]
  }>
}

export const AllProvidersTesting = ({
  children,
  stateValues,
}: AllProvidersTestingProps) => {
  //

  return (
    <ChatProvider testStateValue={stateValues?.ChatProvider}>
      <LoginDataProvider testStateValue={stateValues?.LoginDataProvider}>
        <ProfilesDataProvider testStateValue={stateValues?.ProfilesDataProvider}>
          <SideRightProvider testStateValue={stateValues?.SideRightProvider}>
            {children}
          </SideRightProvider>
        </ProfilesDataProvider>
      </LoginDataProvider>
    </ChatProvider>
  )
}
