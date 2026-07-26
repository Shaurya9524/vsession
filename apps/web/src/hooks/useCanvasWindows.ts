"use client"

import { nanoid } from "nanoid"
import { useReducer, useEffect, useCallback, useRef } from "react"
import { canvasTools, type CanvasWindowType } from "@/config/canvasTools"

export type CanvasWindowState = {
  id: string
  type: CanvasWindowType
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

type State = {
  windows: CanvasWindowState[]
  nextZIndex: number
}

type Action =
  | { type: "ADD_WINDOW"; payload: { windowType: CanvasWindowType; x: number; y: number; width?: number; height?: number } }
  | { type: "MOVE_WINDOW"; payload: { id: string; x: number; y: number } }
  | { type: "RESIZE_WINDOW"; payload: { id: string; width: number; height: number } }
  | { type: "FOCUS_WINDOW"; payload: { id: string } }
  | { type: "REMOVE_WINDOW"; payload: { id: string } }

const initialState: State = {
  windows: [],
  nextZIndex: 1,
}

function reducer(state: State, action: Action): State {
  const { type, payload } = action

  switch (type) {
    case "ADD_WINDOW": {
      const size = canvasTools[payload.windowType].defaultSize
      const newWindow: CanvasWindowState = {
        id: nanoid(),
        type: payload.windowType,
        x: payload.x,
        y: payload.y,
        width: payload.width ?? size.width,
        height: payload.height ?? size.height,
        zIndex: state.nextZIndex
      }
      return {
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1
      }
    }

    case "MOVE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) => w.id === payload.id ? { ...w, x: payload.x, y: payload.y } : w)
      }

    case "RESIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) => w.id === payload.id ? { ...w, width: payload.width, height: payload.height } : w)
      }

    case "FOCUS_WINDOW": {
      const target = state.windows.find((w) => w.id === payload.id)
      if (!target || target.zIndex === state.nextZIndex - 1) return state
      return {
        windows: state.windows.map((w) => w.id === payload.id ? { ...w, zIndex: state.nextZIndex } : w),
        nextZIndex: state.nextZIndex + 1
      }
    }

    case "REMOVE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== payload.id)
      }

    default:
      return state
  }
}

const CHAT_MARGIN = 26

export function useCanvasWindows() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const hasDefaultChat = useRef(false)

  useEffect(() => {
    if (hasDefaultChat.current) return
    hasDefaultChat.current = true

    const chatSize = canvasTools.chat.defaultSize
    const x = window.innerWidth - chatSize.width - CHAT_MARGIN
    const y = CHAT_MARGIN

    dispatch({ type: "ADD_WINDOW", payload: { windowType: "chat", x, y } })
  }, [])

  const addWindow = useCallback((windowType: CanvasWindowType, x: number, y: number) => {
    dispatch({ type: "ADD_WINDOW", payload: { windowType, x, y } })
  }, [])

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    dispatch({ type: "MOVE_WINDOW", payload: { id, x, y } })
  }, [])

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    dispatch({ type: "RESIZE_WINDOW", payload: { id, width, height } })
  }, [])

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: "FOCUS_WINDOW", payload: { id } })
  }, [])

  const removeWindow = useCallback((id: string) => {
    dispatch({ type: "REMOVE_WINDOW", payload: { id } })
  }, [])

  return { windows: state.windows, addWindow, moveWindow, resizeWindow, focusWindow, removeWindow }
}
