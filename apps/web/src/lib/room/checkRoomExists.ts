export async function checkRoomExists(roomId: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REALTIME_URL}/r/${roomId}/exists`)
    if (!res.ok) return false
    const data = await res.json()
    return Boolean(data.exists)
  } catch {
    return false
  }
}
