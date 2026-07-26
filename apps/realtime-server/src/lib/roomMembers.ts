import { redis } from "./redis"
import type { RoomMember } from "@vsession/shared-types"

export function membersKey(roomId: string) {
  return `room:${roomId}:members`
}

export async function getMembers(roomId: string): Promise<RoomMember[]> {
  const raw = await redis.hgetall(membersKey(roomId))
  return Object.values(raw)
    .map((v) => JSON.parse(v) as RoomMember)
    .sort((a, b) => a.joinedAt - b.joinedAt) // sorted by joinedAt ascending
}

export async function addMember(roomId: string, socketId: string, name: string): Promise<RoomMember[]> {
  const key = membersKey(roomId)
  const existingCount = await redis.hlen(key)

  const member: RoomMember = {
    socketId,
    name,
    isHost: existingCount === 0,
    isCoHost: false,
    joinedAt: Date.now(),
  }

  await redis.hset(key, socketId, JSON.stringify(member))
  return getMembers(roomId)
}

export async function removeMember(roomId: string, socketId: string): Promise<RoomMember[]> {
  const key = membersKey(roomId)
  const raw = await redis.hget(key, socketId)
  await redis.hdel(key, socketId)

  if (raw) {
    const leaving: RoomMember = JSON.parse(raw)
    if (leaving.isHost) {
      await promoteNextHost(roomId)
    }
  }

  return getMembers(roomId)
}

async function promoteNextHost(roomId: string) {
  const members = await getMembers(roomId)
  if (members.length === 0) return

  const coHosts = members.filter((m) => m.isCoHost)
  const candidate = coHosts[0] ?? members[0]

  candidate.isHost = true
  candidate.isCoHost = false
  await redis.hset(membersKey(roomId), candidate.socketId, JSON.stringify(candidate))
}

export async function getMemberName(roomId: string, socketId: string): Promise<string> {
  const raw = await redis.hget(membersKey(roomId), socketId)
  if (!raw) return "Guest"
  return (JSON.parse(raw) as RoomMember).name
}
