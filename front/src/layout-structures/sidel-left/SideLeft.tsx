// import { useState } from "react"
import { SideLeftContent } from "./side-left-content/SideLeftContent"
import { SideLeftContentProvider } from "./side-left-content/SideLeftContentContext"
import { SideLeftHeader } from "./side-left-header/SideLeftHeader"

export default function SideLeft() {
  return (
    <SideLeftContentProvider>
      <SideLeftHeader />
      <SideLeftContent />

      {/* <SideLeftMenu /> */}
    </SideLeftContentProvider>
  )
}

// function SideLeftMenu() {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
//       <Button toggleMenu={() => setIsOpen((cv) => !cv)} />
//       <ul
//         style={{
//           display: isOpen ? "block" : "none",
//           position: "absolute",
//           bottom: "91%",
//           right: "91%",
//           minWidth: "6rem",
//           backgroundColor: "darkgreen",
//         }}
//       >
//         <li>
//           <button>item one</button>
//         </li>
//         <li>
//           <button>item two</button>
//         </li>
//         <li>
//           <button>Create group</button>
//         </li>
//       </ul>
//     </div>
//   )
// }

// function Button({ toggleMenu }: { toggleMenu: () => void }) {
//   return (
//     <button
//       onClick={toggleMenu}
//       style={{
//         backgroundColor: "#161616",
//         borderRadius: "50%",
//         width: "4rem",
//         height: "4rem",
//       }}
//     >
//       icon menu
//     </button>
//   )
// }
