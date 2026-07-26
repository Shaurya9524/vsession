import type { Member } from "@/types/member"
import type { RoomMember } from "@vsession/shared-types"

export function toMember(roomMember: RoomMember): Member {
  return {
    id: roomMember.socketId,
    name: roomMember.name,
    role: roomMember.isHost ? "host" : roomMember.isCoHost ? "co-host" : "member"
  }
}
