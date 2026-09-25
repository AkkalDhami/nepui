import { Fira_Code, Geist_Mono, Inter } from "next/font/google"

import "./styles/globals.css"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { RootProvider } from "fumadocs-ui/provider/next"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-code",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontCode.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <RootProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
