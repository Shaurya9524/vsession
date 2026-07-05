import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Vsession"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
