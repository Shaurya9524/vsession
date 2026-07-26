import { env } from "./env"
import Redis from "ioredis"
import { createAdapter } from "@socket.io/redis-adapter"

export const redis = new Redis(env.redisUrl)
const subClient = redis.duplicate()

redis.on("connect", () => {
  console.log("redis: connected")
})

redis.on("error", (err) => {
  console.error("redis: connection error", err)
})

subClient.on("error", (err) => {
  console.error("redis (sub): connection error", err)
})

export const redisAdapter = createAdapter(redis, subClient)
