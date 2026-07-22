"use client"

import { canvasTools } from "@/config/canvasTools"
import { CanvasWindow } from "@/components/room/CanvasWindow"
import type { CanvasWindowState } from "@/hooks/useCanvasWindows"
import styles from "./RoomCanvas.module.css"

type RoomCanvasProps = {
  windows: CanvasWindowState[]
  onMove: (id: string, x: number, y: number) => void
  onResize: (id: string, width: number, height: number) => void
  onFocus: (id: string) => void
  onClose: (id: string) => void
}

export function RoomCanvas({ windows, onMove, onResize, onFocus, onClose }: RoomCanvasProps) {
  return (
    <main className={styles.canvas}>
      {windows.map((canvasWindow) => {
        const { Body } = canvasTools[canvasWindow.type]

        return (
          <CanvasWindow
            key={canvasWindow.id}
            id={canvasWindow.id}
            type={canvasWindow.type}
            x={canvasWindow.x}
            y={canvasWindow.y}
            width={canvasWindow.width}
            height={canvasWindow.height}
            zIndex={canvasWindow.zIndex}
            onMove={onMove}
            onResize={onResize}
            onFocus={onFocus}
            onClose={onClose}
          >
            <Body />
          </CanvasWindow>
        )
      })}
    </main>
  )
}
