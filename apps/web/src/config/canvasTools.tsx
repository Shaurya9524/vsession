import { ComponentType } from "react"
import type { IconType } from "react-icons"
import { ChatIcon, StickyNoteIcon, DocIcon, VideoIcon, WhiteboardIcon } from "@/components/ui/Icons"

// elements
import { Chat } from "@/components/room/Chat"

export type CanvasWindowType = "chat" | "sticky-note" | "whiteboard" | "document" | "video"

type CanvasToolConfig = {
  label: string
  Icon: IconType
  defaultSize: { width: number; height: number }
  Body: ComponentType
}

function ToolPlaceholder({ label }: { label: string }) {
  return (
    <p style={{ padding: 12, fontSize: 12.5, color: "var(--text-muted)" }}>
      {label} content will be displayed here
    </p>
  )
}

export const canvasTools: Record<CanvasWindowType, CanvasToolConfig> = {
  chat: {
    label: "Chat",
    Icon: ChatIcon,
    defaultSize: { width: 300, height: 400 },
    Body: () => <Chat />
  },
  "sticky-note": {
    label: "Sticky Note",
    Icon: StickyNoteIcon,
    defaultSize: { width: 170, height: 170 },
    Body: () => <ToolPlaceholder label="Sticky Note" />
  },
  whiteboard: {
    label: "Whiteboard",
    Icon: WhiteboardIcon,
    defaultSize: { width: 520, height: 380 },
    Body: () => <ToolPlaceholder label="Whiteboard" />
  },
  document: {
    label: "Document",
    Icon: DocIcon,
    defaultSize: { width: 480, height: 400 },
    Body: () => <ToolPlaceholder label="Document" />
  },
  video: {
    label: "Video",
    Icon: VideoIcon,
    defaultSize: { width: 400, height: 260 },
    Body: () => <ToolPlaceholder label="Video" />
  }
}
