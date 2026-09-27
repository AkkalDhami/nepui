import { Navbar } from "@/components/layouts/navbar"
import { ScrollToTopButton } from "@/components/shared/scroll-to-top"
import { Navbar } from "@/components/layouts/navbar"
import { ScrollToTopButton } from "@/components/shared/scroll-to-top"
import { Navbar } from "@/components/layouts/navbar"
import { ScrollToTopButton } from "@/components/shared/scroll-to-top"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      {children}
    </>
  )
}
