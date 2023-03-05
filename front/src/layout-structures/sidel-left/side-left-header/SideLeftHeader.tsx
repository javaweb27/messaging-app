import { SideLeftHeaderMainMenu } from "./SideLeftHeaderMainMenu"
import { SideLeftHeaderUserDataMenu } from "./SideLeftHeaderUserDataMenu"

export function SideLeftHeader() {
  return (
    <div style={{ backgroundColor: "#6495ed", display: "flex" }}>
      <SideLeftHeaderMainMenu />
      <SideLeftHeaderUserDataMenu />
    </div>
  )
}
