import { redis } from "./redis"
import { membersKey } from "./roomMembers"

export async function roomExists(roomId: string): Promise<boolean> {
  const count = await redis.hlen(membersKey(roomId))
  return count > 0
}

export async function endRoom(roomId: string): Promise<void> {
  await redis.del(membersKey(roomId))
}
