import Link from "next/link"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import styles from "./Nav.module.css"

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.wordmark}>
        vsession
        <span className={styles.dot} />
      </Link>
      <div className={styles.actions}>
        <a href="#how-it-works" className={styles.link}>
          How it works
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
