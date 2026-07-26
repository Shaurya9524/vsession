"use client"

import { useEffect, useState } from "react"
import { checkRoomExists } from "@/lib/room/checkRoomExists"
import type { RoomAccessStatus } from "@/types/room"

function wasJustCreated(roomId: string): boolean {
  return sessionStorage.getItem(`vsession:justCreated:${roomId}`) === "1"
}

export function useRoomAccess(roomId: string): RoomAccessStatus {
  const [status, setStatus] = useState<RoomAccessStatus>("checking")

  useEffect(() => {
    let cancelled = false

    async function resolve() {
      if (wasJustCreated(roomId)) {
        if (!cancelled) setStatus("allowed")
        return
      }

      const exists = await checkRoomExists(roomId)
      if (!cancelled) setStatus(exists ? "allowed" : "not-found")
    }

    resolve()

    return () => {
      cancelled = true
    }
  }, [roomId])

  return status
}
