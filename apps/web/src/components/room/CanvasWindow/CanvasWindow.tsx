"use client"

import { useRef } from "react"
import { CloseIcon } from "@/components/ui/Icons"
import { canvasTools, type CanvasWindowType } from "@/config/canvasTools"
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react"
import styles from "./CanvasWindow.module.css"

type CanvasWindowProps = {
  id: string
  type: CanvasWindowType
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  canClose?: boolean
  onMove: (id: string, x: number, y: number) => void
  onResize: (id: string, width: number, height: number) => void
  onFocus: (id: string) => void
  onClose?: (id: string) => void
  children: ReactNode
}

export function CanvasWindow({
  id,
  type,
  x,
  y,
  width,
  height,
  zIndex,
  canClose = true,
  onMove,
  onResize,
  onFocus,
  onClose,
  children,
}: CanvasWindowProps) {
  const { Icon, label } = canvasTools[type]
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
  const resizeState = useRef<{ startX: number; startY: number; originWidth: number; originHeight: number } | null>(null)

  const handleDragPointerDown = (event: ReactPointerEvent) => {
    if ((event.target as HTMLElement).closest("button")) return
    onFocus(id)
    dragState.current = { startX: event.clientX, startY: event.clientY, originX: x, originY: y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleDragPointerMove = (event: ReactPointerEvent) => {
    if (!dragState.current) return
    const deltaX = event.clientX - dragState.current.startX
    const deltaY = event.clientY - dragState.current.startY
    onMove(id, dragState.current.originX + deltaX, dragState.current.originY + deltaY)
  }

  const handleDragPointerUp = () => {
    dragState.current = null
  }

  const handleResizePointerDown = (event: ReactPointerEvent) => {
    event.stopPropagation()
    onFocus(id)
    resizeState.current = { startX: event.clientX, startY: event.clientY, originWidth: width, originHeight: height }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleResizePointerMove = (event: ReactPointerEvent) => {
    if (!resizeState.current) return
    const deltaX = event.clientX - resizeState.current.startX
    const deltaY = event.clientY - resizeState.current.startY
    onResize(
      id,
      Math.max(180, resizeState.current.originWidth + deltaX),
      Math.max(120, resizeState.current.originHeight + deltaY)
    )
  }

  const handleResizePointerUp = () => {
    resizeState.current = null
  }

  return (
    <section className={styles.window} style={{ left: x, top: y, width, height, zIndex }} onPointerDown={() => onFocus(id)}>
      <div
        className={styles.header}
        onPointerDown={handleDragPointerDown}
        onPointerMove={handleDragPointerMove}
        onPointerUp={handleDragPointerUp}
      >
        <span className={styles.title}>
          <Icon size={14} />
          {label}
        </span>
        {canClose && (
          <button className={styles.closeButton} aria-label="Close" onClick={() => onClose?.(id)}>
            <CloseIcon />
          </button>
        )}
      </div>
      <div className={styles.body}>{children}</div>
      <div
        className={styles.resizeHandle}
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
      />
    </section>
  )
}
