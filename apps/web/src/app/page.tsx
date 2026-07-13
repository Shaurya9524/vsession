import { Suspense } from "react"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { Features } from "@/components/home/Features"
import { RoomForm } from "@/components/home/RoomForm"
import { CtaBanner } from "@/components/home/CtaBanner"
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1, minWidth: 320 }}>
            <About />
            <Suspense fallback={null}>
              <RoomForm />
            </Suspense>
          </div>
          <img alt="pinboard" src="./pinboard.svg" className={styles.pinboardIllustration} />
        </section>
      </main>
      <Features />
      <CtaBanner />
      <Footer />
    </>
  )
}

function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 }}>
      <h1 className={styles.headline}>
        One link.
        <br />
        {"Everyone's in the room."}
      </h1>
      <p className={styles.subcopy}>
        {"Chat, watch, sketch, and write together in one shared space. No sign-up required."}
      </p>
    </div>
  )
}
