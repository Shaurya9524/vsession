"use client"

import { useRouter } from "next/navigation"
import { Overlay } from "@/components/ui/Overlay"
import styles from "./SessionEndedOverlay.module.css"

export function SessionEndedOverlay() {
  const router = useRouter()

  return (
    <Overlay>
      <h2 className={styles.title}>Session Ended</h2>
      <p className={styles.message}>The host has ended this session.</p>
      <button className={styles.button} onClick={() => router.push("/")}>
        Return Home
      </button>
    </Overlay>
  )
}
