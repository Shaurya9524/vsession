"use client"

import styles from "./Overlay.module.css"

interface OverlayProps {
  children: React.ReactNode
}

export function Overlay({ children }: OverlayProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>{children}</div>
    </div>
  )
}
