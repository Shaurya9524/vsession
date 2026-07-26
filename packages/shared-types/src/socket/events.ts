import type { RoomJoinPayload, RoomMember } from "./room"
import type { ChatMessage, ChatSendPayload } from "./chat"

export interface ClientToServerEvents {
  "room:join": (payload: RoomJoinPayload) => void
  "chat:send": (payload: ChatSendPayload) => void
}

export interface ServerToClientEvents {
  "room:members": (members: RoomMember[]) => void
  "chat:message": (message: ChatMessage) => void
}
