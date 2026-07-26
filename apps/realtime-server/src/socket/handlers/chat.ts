import { nanoid } from "nanoid"
import type { Socket, Server } from "socket.io"
import { getMemberName } from "../../lib/roomMembers"
import type { ClientToServerEvents, ServerToClientEvents, ChatSendPayload, ChatMessage } from "@vsession/shared-types"

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>
type AppServer = Server<ClientToServerEvents, ServerToClientEvents>

export function registerChatHandlers(socket: AppSocket, io: AppServer) {
  socket.on("chat:send", async ({ roomId, text }: ChatSendPayload) => {
    const senderName = await getMemberName(roomId, socket.id)

    const message: ChatMessage = {
      id: nanoid(),
      roomId,
      senderId: socket.id,
      senderName,
      text,
      createdAt: Date.now(),
    }

    io.to(roomId).emit("chat:message", message)
  })
}
