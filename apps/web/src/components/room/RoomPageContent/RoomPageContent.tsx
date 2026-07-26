"use client"

import Link from "next/link"
import { useState } from "react"
import { useSocket } from "@/hooks/useSocket"
import { useUserName } from "@/hooks/useUserName"
import { useRoomAccess } from "@/hooks/useRoomAccess"
import { useRoomPresence } from "@/hooks/useRoomPresence"
import { useCanvasWindows } from "@/hooks/useCanvasWindows"
import { RoomProvider } from "@/components/providers/RoomProvider"
import type { CanvasWindowType } from "@/config/canvasTools"

import { NameEntryOverlay } from "@/components/room/NameEntryOverlay"
import { MemberPopover } from "@/components/room/MemberPopover"
import { RoomTopBar } from "@/components/room/RoomTopBar"
import { RoomCanvas } from "@/components/room/RoomCanvas"
import { ToolDock } from "@/components/room/ToolDock"


import styles from "./RoomPageContent.module.css"

interface RoomPageContentProps {
  roomId: string
}

export function RoomPageContent({ roomId }: RoomPageContentProps) {
  const accessStatus = useRoomAccess(roomId)
  const { socket } = useSocket()
  const { name, setName, loaded } = useUserName()
  const { members } = useRoomPresence(roomId, name ?? "", loaded, accessStatus === "allowed")
  const showNameEntry = loaded && !name
  const { windows, addWindow, moveWindow, resizeWindow, focusWindow, removeWindow } = useCanvasWindows()
  const [showMembers, setShowMembers] = useState(false)
  const viewer = members.find((m) => m.id === socket?.id)

  const handleAddWindow = (type: CanvasWindowType) => {
    addWindow(type, 200 + windows.length * 24, 200 + windows.length * 24)
  }

  if (accessStatus === "checking") {
    return <div className={styles.statusScreen}>Checking room...</div>
  }

  if (accessStatus === "not-found") {
    return (
      <div className={styles.statusScreen}>
        <p className={styles.statusTitle}>This room does not exist.</p>
        <Link href="/" className={styles.statusLink}>Go home</Link>
      </div>
    )
  }

  return (
    <RoomProvider roomId={roomId} accessStatus={accessStatus}>
      {showNameEntry && <NameEntryOverlay onSubmit={setName} />}
      <div className={styles.roomPage}>
        <RoomTopBar
          isHost={viewer?.role === "host"}
          members={members}
          onToggleMembers={() => setShowMembers((show) => !show)}
        />
        {showMembers && <MemberPopover members={members} viewerIsHost={viewer?.role === "host"} />}
        <RoomCanvas
          windows={windows}
          onMove={moveWindow}
          onResize={resizeWindow}
          onFocus={focusWindow}
          onClose={removeWindow}
        />
        <ToolDock onAddWindow={handleAddWindow} />
      </div>
    </RoomProvider>
  )
}
