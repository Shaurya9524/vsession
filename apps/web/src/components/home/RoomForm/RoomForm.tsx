"use client"

import { useEffect, useState } from "react"
import { UserIcon } from "@/components/ui/Icons"
import { useUserName } from "@/hooks/useUserName"
import { parseRoomCode } from "@/lib/room/parseRoomCode"
import { generateRoomId } from "@/lib/room/generateRoomId"
import { checkRoomExists } from "@/lib/room/checkRoomExists"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/providers/ToastProvider"
import styles from "./RoomForm.module.css"

export function RoomForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get("r")
  const { showToast } = useToast()
  const { name: storedName, setName, loaded } = useUserName()

  const [name, setLocalName] = useState("")
  const [roomCode, setRoomCode] = useState(roomId || "")

  useEffect(() => {
    if (loaded && storedName) {
      setLocalName(storedName)
    }
  }, [loaded, storedName])

  function handleCreateRoom() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      showToast("Enter your name first.", "error")
      return
    }

    const newRoomId = generateRoomId()
    sessionStorage.setItem(`vsession:justCreated:${newRoomId}`, "1")
    setName(trimmedName)
    router.push(`/r/${newRoomId}`)
  }

  async function handleJoinRoom() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      showToast("Enter your name first.", "error")
      return
    }

    if (!roomCode.trim()) {
      showToast("Enter a room link to join.", "error")
      return
    }

    const parsedRoomId = parseRoomCode(roomCode)
    if (!parsedRoomId) {
      showToast("Invalid room link.", "error")
      return
    }

    const exists = await checkRoomExists(parsedRoomId)
    if (!exists) {
      showToast("Room not found.", "error")
      return
    }

    setName(trimmedName)
    router.push(`/r/${parsedRoomId}`)
  }

  return (
    <div className={styles.form}>
      <div className={styles.nameField}>
        <UserIcon className={styles.icon} />
        <input
          type="text"
          placeholder="your name"
          aria-label="your name"
          value={name}
          onChange={(e) => setLocalName(e.target.value)}
          className={styles.nameInput}
        />
      </div>

      <button type="button" onClick={handleCreateRoom} className={styles.createButton}>
        Create a room
      </button>

      <div className={styles.joinField}>
        <input
          type="text"
          placeholder="vsession.app/r/8fk2x"
          aria-label="room code or link"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className={styles.joinInput}
        />
        <button type="button" onClick={handleJoinRoom} className={styles.joinButton}>
          join
        </button>
      </div>
    </div>
  )
}
