import { roomIdLength } from "@/config/room"
import { customAlphabet } from "nanoid"

const characters = "23456789abcdefghjkmnpqrstuvwxyz"
const nanoid = customAlphabet(characters, roomIdLength)

export function generateRoomId(): string {
  return nanoid()
}
