import { ScrappingProvider } from "@/context/scrapping"
import React from "react"

export default function ScrappingLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ScrappingProvider>
      {children}
    </ScrappingProvider>
  )
}