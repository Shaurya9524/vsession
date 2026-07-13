"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "vsession:name"

export function useUserName() {
  const [name, setNameState] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setNameState(localStorage.getItem(STORAGE_KEY))
    setLoaded(true)
  }, [])

  function setName(value: string) {
    localStorage.setItem(STORAGE_KEY, value)
    setNameState(value)
  }

  return { name, setName, loaded }
}
