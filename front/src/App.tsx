// import reactLogo from "./assets/react.svg"
import "../styles/config/preflight.css"
import "../styles/config/index.css"
import "../styles/config/App.css"
import "../styles/components/index.scss"

import { HashRouter, Route, Routes } from "react-router-dom"
import Chat from "./pages/chat/Chat"
import Login from "./pages/auth-login/Login"
import Register from "./pages/auth-register/Register"
import Settings from "./pages/settings/Settings"
import { SocketProvider } from "./lib/SocketContext"
import { ChatGlobalSocketListeners } from "./features/chat/uniques/ChatGlobalSocketListeners"
import { ChatProvider } from "./features/chat/context/ChatContext"
import { ProfilesDataProvider } from "./global-state-context/profiles-data-ctx/ProfilesDataContext"
import { SideRightProvider } from "./layout-structures/side-right/SideRightContext"
import { LoginDataProvider } from "./global-state-context/login-data-ctx/LoginDataCtx"
import { AsPrivate, AsPublic } from "./pagesAccess"

function App() {
  return (
    <SocketProvider>
      <ChatProvider>
        <ProfilesDataProvider>
          <SideRightProvider>
            <HashRouter>
              <LoginDataProvider>
                <Routes>
                  <Route path="/" element={<AsPrivate page={Chat} />} />
                  <Route path="/login" element={<AsPublic page={Login} />} />
                  <Route path="/register" element={<AsPublic page={Register} />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>

                <ChatGlobalSocketListeners />
              </LoginDataProvider>
            </HashRouter>
          </SideRightProvider>
        </ProfilesDataProvider>
      </ChatProvider>
    </SocketProvider>
  )
}

export default App
