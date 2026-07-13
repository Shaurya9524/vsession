import { RightArrowIcon } from "@/components/ui/Icons"
import styles from "./CtaBanner.module.css"

const steps = ["create a room", "share the link", "drop in tools"]

export function CtaBanner() {
  return (
    <section id="how-it-works" className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.copy}>
          <h2 className={styles.headline}>Ready to hop in?</h2>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={styles.stepText}>{step}</span>
                {i < steps.length - 1 && (
                  <RightArrowIcon size={14} opacity={0.5} />
                )}
              </div>
            ))}
          </div>
        </div>
        <a href="#" className={styles.cta}>
          Create a room
        </a>
      </div>
    </section>
  )
}