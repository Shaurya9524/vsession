"use client"

import { useRouter } from "next/navigation"
import { useSocket } from "@/hooks/useSocket"
import { createContext, useCallback, useEffect, useState } from "react"
import type { RoomAccessStatus } from "@/types/room"

interface RoomContextValue {
  roomId: string
  accessStatus: RoomAccessStatus
  leaveRoom: () => void
  endSession: () => void
  sessionEnded: boolean
}

export const RoomContext = createContext<RoomContextValue | null>(null)

interface RoomProviderProps {
  roomId: string
  accessStatus: RoomAccessStatus
  children: React.ReactNode
}

export function RoomProvider({ roomId, accessStatus, children }: RoomProviderProps) {
  const { socket } = useSocket()
  const router = useRouter()
  const [sessionEnded, setSessionEnded] = useState(false)

  useEffect(() => {
    if (!socket) return

    const handleRoomEnded = () => setSessionEnded(true)
    socket.on("room:ended", handleRoomEnded)

    return () => {
      socket.off("room:ended", handleRoomEnded)
    }
  }, [socket])

  const leaveRoom = useCallback(() => {
    socket?.disconnect()
    router.push("/")
  }, [socket, router])

  const endSession = useCallback(() => {
    socket?.emit("room:end")
    router.push("/")
  }, [socket, router])

  return (
    <RoomContext.Provider value={{ roomId, accessStatus, leaveRoom, endSession, sessionEnded }}>
      {children}
    </RoomContext.Provider>
  )
}
