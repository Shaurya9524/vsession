"use client"

import { use } from "react"
import Link from "next/link"
import { useRoomAccess } from "@/hooks/useRoomAccess"
import { RoomProvider } from "@/components/providers/RoomProvider"
import { RoomPageContent } from "@/components/room/RoomPageContent"
import { SocketProvider } from "@/components/providers/SocketProvider"
import styles from "./page.module.css"

type RoomPageProps = {
  params: Promise<{ roomId: string }>
}

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = use(params)
  const accessStatus = useRoomAccess(roomId)

  if (accessStatus === "checking") {
    return <div className={styles.statusScreen}>Checking room...</div>
  }

  if (accessStatus === "not-found") {
    return (
      <div className={styles.statusScreen}>
        <p className={styles.statusTitle}>This room does not exist.</p>
        <Link href="/" className={styles.statusLink}>Go home</Link>
      </div>
    )
  }

  return (
    <SocketProvider>
      <RoomProvider roomId={roomId} accessStatus={accessStatus}>
        <RoomPageContent roomId={roomId} />
      </RoomProvider>
    </SocketProvider>
  )
}
