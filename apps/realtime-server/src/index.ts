import { env } from "./lib/env"
import { app } from "./http/app"
import { createServer } from "http"
import { Server } from "socket.io"
import { onConnection } from "./socket"
import { redisAdapter } from "./lib/redis"
import type { ClientToServerEvents, ServerToClientEvents } from "@vsession/shared-types"

const httpServer = createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: env.webOrigin,
    credentials: true
  }
})

io.adapter(redisAdapter)

io.on("connection", (socket) => onConnection(socket, io))

httpServer.listen(env.port, () => {
  console.log(`realtime-server listening on port ${env.port}`)
})
