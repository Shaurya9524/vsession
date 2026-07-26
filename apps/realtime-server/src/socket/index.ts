import { registerRoomHandlers } from "./handlers/room"
import { registerChatHandlers } from "./handlers/chat"
import type { Socket, Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents } from "@vsession/shared-types"

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>
type AppServer = Server<ClientToServerEvents, ServerToClientEvents>

export function onConnection(socket: AppSocket, io: AppServer) {
  console.log(`socket connected: ${socket.id}`)

  registerRoomHandlers(socket, io)
  registerChatHandlers(socket, io)

  socket.on("disconnect", (reason) => {
    console.log(`socket disconnected: ${socket.id} (${reason})`)
  })
}
