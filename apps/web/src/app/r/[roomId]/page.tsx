"use client"

import { use } from "react"
import { RoomPageContent } from "@/components/room/RoomPageContent"
import { SocketProvider } from "@/components/providers/SocketProvider"

type RoomPageProps = {
  params: Promise<{ roomId: string }>
}

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = use(params)

  return (
    <SocketProvider>
      <RoomPageContent roomId={roomId} />
    </SocketProvider>
  )
}
