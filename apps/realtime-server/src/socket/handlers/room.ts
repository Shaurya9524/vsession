import type { Socket, Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents, RoomJoinPayload } from "@vsession/shared-types"
import { addMember, removeMember } from "../../lib/roomMembers"

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>
type AppServer = Server<ClientToServerEvents, ServerToClientEvents>

export function registerRoomHandlers(socket: AppSocket, io: AppServer) {
  socket.on("room:join", async ({ roomId, name }: RoomJoinPayload) => {
    socket.join(roomId)
    const members = await addMember(roomId, socket.id, name ?? "Guest")
    io.to(roomId).emit("room:members", members)
  })

  socket.on("disconnecting", async () => {
    const rooms = [...socket.rooms].filter((room) => room !== socket.id)

    for (const roomId of rooms) {
      const members = await removeMember(roomId, socket.id)
      io.to(roomId).emit("room:members", members)
    }
  })
}
