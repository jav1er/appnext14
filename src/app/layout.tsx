"use client"

import TankstackProvider from "@/providers/tankstackProvider"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TankstackProvider>
          <>{children}</>
        </TankstackProvider>
      </body>
    </html>
  )
}
