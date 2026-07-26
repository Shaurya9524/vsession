"use client"

import { HostIcon } from "@/components/ui/Icons"
import type { Member } from "@/types/member"
import styles from "./MemberPopover.module.css"

type MemberPopoverProps = {
  members: Member[]
  viewerIsHost: boolean
}

export function MemberPopover({ viewerIsHost, members }: MemberPopoverProps) {
  const handlePromote = (memberId: string, role: "host" | "co-host") => {
    // todo: wire to socket event once realtime-server is made
    console.log(`promote ${memberId} to ${role}`)
  }

  return (
    <div className={styles.popover}>
      {members.map(({ id, name, role }) => (
        <div key={id} className={styles.row}>
          <span className={`${styles.avatar} ${role === "host" ? styles.host : ""}`}>{name[0].toUpperCase()}</span>
          <span className={styles.name}>{name}</span>

          {role === "host" && (
            <span className={styles.hostTag}>
              <HostIcon />
              Host
            </span>
          )}

          {viewerIsHost && role === "member" && (
            <div className={styles.actions}>
              <button onClick={() => handlePromote(id, "co-host")}>Make co-host</button>
              <button onClick={() => handlePromote(id, "host")}>Make host</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
