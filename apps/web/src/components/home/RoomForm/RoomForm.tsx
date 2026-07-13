"use client"

import { useState } from "react"
import { UserIcon } from "@/components/ui/Icons"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/providers/ToastProvider"
import styles from "./RoomForm.module.css"

export function RoomForm() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("r")
  const { showToast } = useToast()

  const [name, setName] = useState("")
  const [roomCode, setRoomCode] = useState(roomId || "")

  function handleCreateRoom() {
    if (!name.trim()) {
      showToast("Enter your name first.", "error")
      return
    }

    // todo: wire to realtime-server once it's made
    console.log("create room for", name)

    showToast("Room creation is still in development.", "info")
  }

  function handleJoinRoom() {
    if (!name.trim()) {
      showToast("Enter your name first.", "error")
      return
    }

    if (!roomCode.trim()) {
      showToast("Enter a room link to join.", "error")
      return
    }

    // todo: replace with real navigation once realtime-server is made
    console.log("join room", roomCode, "as", name)

    showToast("Joining rooms is still in development.", "info")
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
          onChange={(e) => setName(e.target.value)}
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
