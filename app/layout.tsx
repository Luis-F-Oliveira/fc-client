import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/provider/theme-provider"
import { Metadata } from "next"
import { Sidebar } from "./sidebar"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Facilita Diário"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          "w-screen h-screen bg-background font-sans antialiased overflow-x-hidden transition-colors flex gap-3",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <main className="overflow-y-auto container mx-auto px-2">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
