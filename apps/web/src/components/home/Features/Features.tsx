import { ChatIcon, VideoIcon, WhiteboardIcon, StickyNoteIcon, DocIcon } from "@/components/ui/Icons"
import styles from "./Features.module.css"

const features = [
  { icon: ChatIcon, title: "Chat", copy: "The default room has the chat always on, no setup." },
  { icon: VideoIcon, title: "Synced video", copy: "Press play once, everyone stays in sync." },
  { icon: WhiteboardIcon, title: "Whiteboard", copy: "Sketch ideas together in real time." },
  { icon: StickyNoteIcon, title: "Sticky notes", copy: "Pin quick thoughts straight to the board." },
  { icon: DocIcon, title: "Shared doc", copy: "Write together, no extra tab needed." },
]

export function Features() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Everything lives in one room</h2>
        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, copy }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardCopy}>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
