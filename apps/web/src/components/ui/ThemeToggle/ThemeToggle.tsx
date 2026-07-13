"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { DarkModeIcon, LightModeIcon } from "../Icons"
import styles from "./ThemeToggle.module.css"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Switch to light theme"
    >
      {theme === "dark" ? <LightModeIcon size={18} /> : <DarkModeIcon size={18} />}
    </button>
  )
}
