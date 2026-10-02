import { Metadata } from "next"
import { Fira_Code, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google"
import "./styles/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { JsonLd } from "@/components/seo/json-ld"
import {
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  rootMetadata,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/next"
import { RootProvider } from "fumadocs-ui/provider/next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./styles/globals.css"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-code",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = { ...rootMetadata }

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
        jetBrainsMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <JsonLd
          data={[
            createWebSiteJsonLd(),
            createOrganizationJsonLd(),
            createSoftwareApplicationJsonLd(),
          ]}
        />
        <Analytics />
        <ThemeProvider>
          <Toaster />
          <RootProvider>
            <NuqsAdapter>
              <TooltipProvider>{children}</TooltipProvider>
            </NuqsAdapter>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
