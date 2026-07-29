export interface RoomJoinPayload {
  roomId: string
  name?: string
}

export interface RoomMember {
  socketId: string
  name: string
  isHost: boolean
  isCoHost: boolean
  joinedAt: number
}

export interface RoomEndedPayload {
  reason: "host_ended"
}
