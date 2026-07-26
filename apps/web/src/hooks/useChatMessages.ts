import { useEffect, useState } from "react"
import { useSocket } from "./useSocket"
import type { ChatMessage } from "@vsession/shared-types"

export function useChatMessages(roomId: string, canJoin: boolean) {
  const { socket } = useSocket()
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (!socket) return

    function handleMessage(message: ChatMessage) {
      setMessages((prev) => [...prev, message])
    }

    socket.on("chat:message", handleMessage)
    return () => {
      socket.off("chat:message", handleMessage)
    }
  }, [socket])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!socket || !canJoin || !trimmed) return
    socket.emit("chat:send", { roomId, text: trimmed })
  }

  return { messages, sendMessage }
}
