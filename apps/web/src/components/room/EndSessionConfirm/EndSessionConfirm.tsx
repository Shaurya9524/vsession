"use client"

import { Overlay } from "@/components/ui/Overlay"
import styles from "./EndSessionConfirm.module.css"

interface EndSessionConfirmProps {
  onConfirm: () => void
  onCancel: () => void
}

export function EndSessionConfirm({ onConfirm, onCancel }: EndSessionConfirmProps) {
  return (
    <Overlay>
      <h2 className={styles.title}>End Session?</h2>
      <p className={styles.message}>
        {"Everyone in the room will be disconnected right now. This can't be undone."}
      </p>
      <div className={styles.actions}>
        <button className={styles.btnGhost} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.btnDanger} onClick={onConfirm}>
          End Session
        </button>
      </div>
    </Overlay>
  )
}
