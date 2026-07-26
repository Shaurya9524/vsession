"use client"

import { createContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import type { ClientToServerEvents, ServerToClientEvents } from "@vsession/shared-types"

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

interface SocketContextValue {
  socket: AppSocket | null
  isConnected: boolean
}

export const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<AppSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket: AppSocket = io(process.env.NEXT_PUBLIC_REALTIME_URL ?? "http://localhost:4000")

    socket.on("connect", () => setIsConnected(true))
    socket.on("disconnect", () => setIsConnected(false))

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
