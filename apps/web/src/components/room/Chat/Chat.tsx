"use client"

import { useState } from "react"
import { SendIcon } from "@/components/ui/Icons"
import { useSocket } from "@/hooks/useSocket"
import { useChatMessages } from "@/hooks/useChatMessages"
import { useRoom } from "@/hooks/useRoom"
import styles from "./Chat.module.css"

export function Chat() {
  const { roomId, accessStatus } = useRoom()
  const { socket } = useSocket()
  const { messages, sendMessage } = useChatMessages(roomId, accessStatus === "allowed")
  const [draft, setDraft] = useState("")

  function handleSend() {
    sendMessage(draft)
    setDraft("")
  }

  return (
    <div className={styles.chatBody}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <span className={`${styles.msgAuthor} ${msg.senderId === socket?.id ? styles.msgAuthorSelf : ""}`}>
              {msg.senderName}
            </span>
            <p className={styles.msgText}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Message the room"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className={styles.sendButton} aria-label="Send" onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
