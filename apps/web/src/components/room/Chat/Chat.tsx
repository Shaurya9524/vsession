"use client"

import { SendIcon } from "@/components/ui/Icons"
import styles from "./Chat.module.css"

const sampleMessages = [
  { type: "system" as const, text: "Ronith joined the room" },
  { type: "message" as const, author: "You", self: true, text: "hey, can everyone see the board?" },
  { type: "message" as const, author: "Ronith", self: false, text: "yep, loading it now" },
  { type: "message" as const, author: "Naman", self: false, text: "same, one sec" }
]

export function Chat() {
  return (
    <div className={styles.chatBody}>
      <div className={styles.messages}>
        {sampleMessages.map((msg, i) =>
          msg.type === "system" ? (
            <p key={i} className={styles.msgSystem}>{msg.text}</p>
          ) : (
            <div key={i}>
              <span className={`${styles.msgAuthor} ${msg.self ? styles.msgAuthorSelf : ""}`}>{msg.author}</span>
              <p className={styles.msgText}>{msg.text}</p>
            </div>
          )
        )}
      </div>
      <div className={styles.inputRow}>
        <input type="text" placeholder="Message the room" />
        <button className={styles.sendButton} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
