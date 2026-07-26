import { useContext } from "react"
import { RoomContext } from "@/components/providers/RoomProvider"

export function useRoom() {
  const ctx = useContext(RoomContext)
  if (!ctx) {
    throw new Error("useRoom must be used within a RoomProvider")
  }
  return ctx
}
