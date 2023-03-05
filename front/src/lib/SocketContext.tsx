import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { NODE_API } from "../config"

const Context = createContext(undefined! as Socket | undefined)

export const useSocket = () => useContext(Context)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const newSocket = io(NODE_API)
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return <Context.Provider value={socket}>{children}</Context.Provider>
}
