"use client"

import { canvasTools, type CanvasWindowType } from "@/config/canvasTools"
import styles from "./ToolDock.module.css"

type ToolDockProps = {
  onAddWindow: (windowType: CanvasWindowType) => void
}

const toolTypes = Object.keys(canvasTools) as CanvasWindowType[]

export function ToolDock({ onAddWindow }: ToolDockProps) {
  return (
    <div className={styles.dock}>
      {toolTypes.map((type) => {
        const { Icon: Icon, label } = canvasTools[type]
        return (
          <button key={type} className={styles.dockItem} onClick={() => onAddWindow(type)}>
            <Icon size={18} />
            <span className={styles.dockLabel}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
