import { env } from "../lib/env"
import cors from "cors"
import express from "express"
import { roomExists } from "../lib/room"

export const app = express()

app.use(cors({ origin: env.webOrigin }))

app.get("/r/:roomId/exists", async (req, res) => {
  const { roomId } = req.params

  const exists = await roomExists(roomId)
  res.json({ exists })
})
