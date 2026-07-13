import Link from "next/link"
import styles from "./Footer.module.css"
import { CopyrightIcon } from "@/components/ui/Icons"

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.top}>
					<div className={styles.brand}>
						<div className={styles.wordmark}>
							vsession
							<span className={styles.dot} />
						</div>
						<p className={styles.tagline}>{"One link. Everyone's in the room."}</p>
					</div>

					<div className={styles.linkGroup}>
						<span className={styles.groupLabel}>Product</span>
						<a href="#how-it-works" className={styles.link}>
							How it works
						</a>
					</div>

					<div className={styles.linkGroup}>
						<span className={styles.groupLabel}>Legal</span>
						<Link href="/terms" className={styles.link}>
							Terms of Service
						</Link>
						<Link href="/privacy" className={styles.link}>
							Privacy Policy
						</Link>
					</div>
				</div>

				<div className={styles.bottom}>
					<span className={styles.copyright}><CopyrightIcon /> 2026 vsession</span>
				</div>
			</div>
		</footer>
	)
}
