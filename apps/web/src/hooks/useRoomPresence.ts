import { useSocket } from "./useSocket"
import { useEffect, useState } from "react"
import { toMember } from "@/lib/mappers/member"
import type { Member } from "@/types/member"
import type { RoomMember } from "@vsession/shared-types"

export function useRoomPresence(roomId: string, name: string, nameLoaded: boolean, enabled: boolean) {
  const { socket, isConnected } = useSocket()
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    if (!socket) return

    function handleMembers(roomMembers: RoomMember[]) {
      setMembers(roomMembers.map((roomMember) => toMember(roomMember)))
    }

    socket.on("room:members", handleMembers)
    return () => {
      socket.off("room:members", handleMembers)
    }
  }, [socket])

  useEffect(() => {
    if (!socket || !isConnected || !nameLoaded || !name || !enabled) return

    socket.emit("room:join", { roomId, name })
  }, [socket, isConnected, nameLoaded, roomId, name])

  return { members, isConnected }
}
