import { IconType } from "react-icons"
import { ErrorIcon, WarningIcon, SuccessIcon, InfoIcon, CloseIcon } from "@/components/ui/Icons"
import styles from "./Toast.module.css"

export type ToastType = "success" | "warning" | "error" | "info"

type ToastProps = {
  message: string
  type: ToastType
  onClose: () => void
}

const icons: Record<ToastType, IconType> = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

export function Toast({ message, type, onClose }: ToastProps) {
  const Icon = icons[type]

  return (
    <div className={styles.toast} data-type={type}>
      <Icon size={20} className={styles.icon} />
      <span className={styles.message}>{message}</span>
      <button type="button" onClick={onClose} className={styles.close} aria-label="Dismiss">
        <CloseIcon size={16} />
      </button>
    </div>
  )
}
