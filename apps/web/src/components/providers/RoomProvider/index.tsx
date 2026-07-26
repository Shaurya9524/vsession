"use client"

import { createContext } from "react"
import type { RoomAccessStatus } from "@/types/room"

interface RoomContextValue {
  roomId: string
  accessStatus: RoomAccessStatus
}

export const RoomContext = createContext<RoomContextValue | null>(null)

interface RoomProviderProps extends RoomContextValue {
  children: React.ReactNode
}

export function RoomProvider({ roomId, accessStatus, children }: RoomProviderProps) {
  return (
    <RoomContext.Provider value={{ roomId, accessStatus }}>
      {children}
    </RoomContext.Provider>
  )
}
