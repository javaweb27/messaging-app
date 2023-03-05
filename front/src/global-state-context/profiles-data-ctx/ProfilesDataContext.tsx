import { createContext, PropsWithChildren, useContext, useState } from "react"

const ProfilesDataContext = createContext(undefined! as ProfilesDataCtx)

interface ProfilesDataCtx {
  profilesDataCtx: ProfilesDataCtxState
  setProfilesDataCtx: React.Dispatch<React.SetStateAction<ProfilesDataCtxState>>
}
interface ProfilesDataCtxState {
  /** stores data of fetched users so others props can take the data from here */
  users: Map<string, { nickname: string }>
  /** stores data of fetched groups so others props can take the data from here */
  groups: Map<string, { nickname: string }>
}

interface ProfilesDataProviderProps extends Required<PropsWithChildren> {
  testStateValue?: ProfilesDataCtxState
}

export function ProfilesDataProvider(props: ProfilesDataProviderProps) {
  const [profilesDataCtx, setProfilesDataCtx] = useState<ProfilesDataCtxState>(
    props.testStateValue ?? {
      groups: new Map(),
      users: new Map(),
    }
  )

  return (
    <ProfilesDataContext.Provider value={{ profilesDataCtx, setProfilesDataCtx }}>
      {props.children}
    </ProfilesDataContext.Provider>
  )
}

export const useProfilesDataCtx = () => useContext(ProfilesDataContext)
