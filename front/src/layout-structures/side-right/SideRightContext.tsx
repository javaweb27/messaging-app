import { createContext, PropsWithChildren, useContext, useState } from "react"

const SideRightContext = createContext(undefined! as SideRightCtx)

type SideRightCtxState =
  | { mode: null }
  | { mode: "chat" }
  | { mode: "profile-page"; id: string; as: "user" | "group" }
  | { mode: "request"; id: string; groupName: string }

interface SideRightCtx {
  view: SideRightCtxState
  setView: React.Dispatch<React.SetStateAction<SideRightCtxState>>
}

export const useSideRightCtx = () => useContext(SideRightContext)

interface SideRightProvider extends Required<PropsWithChildren> {
  testStateValue?: SideRightCtxState
}

export function SideRightProvider({ children, testStateValue }: SideRightProvider) {
  const [view, setView] = useState<SideRightCtxState>(testStateValue ?? { mode: null })

  return (
    <SideRightContext.Provider value={{ view, setView }}>
      {children}
    </SideRightContext.Provider>
  )
}
