"use client"

import { use, useState } from "react"
import { RoomTopBar } from "@/components/room/RoomTopBar"
import { RoomCanvas } from "@/components/room/RoomCanvas"
import { ToolDock } from "@/components/room/ToolDock"
import { MemberPopover } from "@/components/room/MemberPopover"
import { useCanvasWindows } from "@/hooks/useCanvasWindows"
import { Member } from "@/components/room/MemberPopover/MemberPopover"
import type { CanvasWindowType } from "@/config/canvasTools"
import styles from "./page.module.css"

type RoomPageProps = {
  params: Promise<{ roomId: string }>
}

const members: Member[] = [
  { id: "1", name: "Shaurya", role: "host" },
  { id: "2", name: "Ronith", role: "member" },
  { id: "3", name: "Naman", role: "member" },
  { id: "4", name: "Rishabh", role: "member" },
  { id: "5", name: "Akshat", role: "member" },
]

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = use(params)
  const { windows, addWindow, moveWindow, resizeWindow, focusWindow, removeWindow } = useCanvasWindows()
  const [showMembers, setShowMembers] = useState(false)

  const handleAddWindow = (type: CanvasWindowType) => {
    addWindow(type, 200 + windows.length * 24, 200 + windows.length * 24)
  }

  return (
    <div className={styles.roomPage}>
      <RoomTopBar
        roomId={roomId}
        isHost={true}
        members={members}
        onToggleMembers={() => setShowMembers((show) => !show)}
      />
      {showMembers && <MemberPopover members={members} viewerIsHost={true} />}
      <RoomCanvas
        windows={windows}
        onMove={moveWindow}
        onResize={resizeWindow}
        onFocus={focusWindow}
        onClose={removeWindow}
      />
      <ToolDock onAddWindow={handleAddWindow} />
    </div>
  )
}
