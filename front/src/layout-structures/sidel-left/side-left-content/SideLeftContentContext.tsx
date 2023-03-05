import { createContext, useContext, useState } from "react"
import { SideLeftContentData } from "./SideLeftContent"

const Context = createContext(
  [] as unknown as [StateValue, React.Dispatch<React.SetStateAction<StateValue>>]
)

export const useSideLeftContentCtx = () => useContext(Context)

type StateValue = keyof typeof SideLeftContentData

export function SideLeftContentProvider(props: { children: React.ReactNode }) {
  const state = useState<StateValue>("Chats")

  return <Context.Provider value={state}>{props.children}</Context.Provider>
}
