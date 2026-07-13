import type { Metadata } from "next"
import { Providers } from "@/components/providers/Providers"
import { Space_Grotesk, Inter, Caveat, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600"], variable: "--font-display" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" })
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-handwritten" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "vsession"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable} ${plexMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
