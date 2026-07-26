import { redis } from "./redis"
import { membersKey } from "./roomMembers"

export async function roomExists(roomId: string): Promise<boolean> {
  const count = await redis.hlen(membersKey(roomId))
  return count > 0
}
