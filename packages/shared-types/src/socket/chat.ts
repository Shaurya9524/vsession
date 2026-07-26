export interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  text: string
  createdAt: number
}

export interface ChatSendPayload {
  roomId: string
  text: string
}
