"use client"

import { useState } from "react"
import { useToast } from "@/components/providers/ToastProvider"
import styles from "./NameEntryOverlay.module.css"

interface NameEntryOverlayProps {
  onSubmit: (name: string) => void
}

export function NameEntryOverlay({ onSubmit }: NameEntryOverlayProps) {
  const [value, setValue] = useState("")
  const { showToast } = useToast()

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed) {
      showToast("Enter a name to join.", "error")
      return
    }
    onSubmit(trimmed)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.title}>Enter Your Name</h2>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Your name"
          autoFocus
        />
        <button className={styles.button} onClick={handleSubmit}>
          Join Room
        </button>
      </div>
    </div>
  )
}
