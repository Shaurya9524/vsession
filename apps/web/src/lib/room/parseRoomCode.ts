import { roomIdLength } from "@/config/room"

export function parseRoomCode(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  let code: string | null

  const linkMatch = trimmed.match(/\/r\/([a-z0-9]+)/i)
  if (linkMatch) {
    code = linkMatch[1]
  } else {
    const stripped = trimmed.replace(/\/+$/, "")
    const parts = stripped.split("/")
    code = parts[parts.length - 1] || null
  }

  if (!code || code.length !== roomIdLength) return null
  return code.toLowerCase()
}
