import type { RoomEndedPayload, RoomJoinPayload, RoomMember } from "./room"
import type { ChatMessage, ChatSendPayload } from "./chat"

export interface ClientToServerEvents {
  "room:join": (payload: RoomJoinPayload) => void
  "chat:send": (payload: ChatSendPayload) => void
  "room:end": () => void
}

export interface ServerToClientEvents {
  "room:members": (members: RoomMember[]) => void
  "chat:message": (message: ChatMessage) => void
  "room:ended": (payload: RoomEndedPayload) => void
}
