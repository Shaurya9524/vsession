"use client"

import { useState } from "react"
import { useRoom } from "@/hooks/useRoom"
import { useSocket } from "@/hooks/useSocket"
import { useUserName } from "@/hooks/useUserName"
import { useRoomPresence } from "@/hooks/useRoomPresence"
import { useCanvasWindows } from "@/hooks/useCanvasWindows"
import type { CanvasWindowType } from "@/config/canvasTools"

import { NameEntryOverlay } from "@/components/room/NameEntryOverlay"
import { MemberPopover } from "@/components/room/MemberPopover"
import { RoomTopBar } from "@/components/room/RoomTopBar"
import { RoomCanvas } from "@/components/room/RoomCanvas"
import { ToolDock } from "@/components/room/ToolDock"
import { SessionEndedOverlay } from "../SessionEndedOverlay"

import styles from "./RoomPageContent.module.css"

interface RoomPageContentProps {
  roomId: string
}

export function RoomPageContent({ roomId }: RoomPageContentProps) {
  // room
  const { sessionEnded } = useRoom()
  const { socket } = useSocket()

  // identity
  const { name, setName, loaded } = useUserName()
  const showNameEntry = loaded && !name

  // presence
  const { members } = useRoomPresence(roomId, name ?? "", loaded, true)
  const viewer = members.find((m) => m.id === socket?.id)

  // canvas
  const { windows, addWindow, moveWindow, resizeWindow, focusWindow, removeWindow } = useCanvasWindows()

  // ui state
  const [showMembers, setShowMembers] = useState(false)

  const handleAddWindow = (type: CanvasWindowType) => {
    addWindow(type, 200 + windows.length * 24, 200 + windows.length * 24)
  }

  return (
    <>
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
      {sessionEnded && <SessionEndedOverlay />}
    </>
  )
}
