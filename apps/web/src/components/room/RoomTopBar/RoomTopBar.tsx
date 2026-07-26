"use client"

import { useState } from "react"
import { CopyIcon } from "@/components/ui/Icons"
import type { Member } from "@/types/member"
import { useRoom } from "@/hooks/useRoom"
import styles from "./RoomTopBar.module.css"

type RoomTopBarProps = {
  isHost: boolean
  members: Member[]
  onToggleMembers: () => void
}

export function RoomTopBar({ isHost, members, onToggleMembers }: RoomTopBarProps) {
  const { roomId }= useRoom()
  const [copied, setCopied] = useState(false)
  const overflowCount = members.length - 3

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/r/${roomId}`
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <span className={styles.wordmark}>vsession</span>
        <button className={styles.roomChip} onClick={handleCopyLink}>
          <span className={styles.roomCode}>{roomId}</span>
          <CopyIcon />
        </button>
        {copied && <span className={styles.copiedHint}>Copied</span>}
      </div>

      <div className={styles.right}>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          Connected
        </div>

        <button className={styles.avatarStack} onClick={onToggleMembers} aria-label="View members">
          {members.slice(0, 3).map(({ id, name, role }, index) => (
            <span
              key={id}
              className={`${styles.avatar} ${role === "host" ? styles.host : ""}`}
              style={{ zIndex: members.length - index }}
            >
              {name[0].toUpperCase()}
            </span>
          ))}
          {overflowCount > 0 && <span className={styles.avatarMore}>+{overflowCount}</span>}
        </button>

        <div className={styles.divider} />

        <button className={styles.btnGhost}>Leave Room</button>
        {isHost && <button className={styles.btnDanger}>End Session</button>}
      </div>
    </header>
  )
}
