import { HeroSection } from "@/components/landing/hero-section"
import { Showcase } from "@/components/landing/showcase"
import { Footer } from "@/components/layouts/footer"
import { Container } from "@/components/shared/container"

export default function Page() {
  return (
    <>
      <Container className="space-y-8">
        <HeroSection />
        {/* <HeroCentered /> */}
        <Showcase />
      </Container>
      <Footer />
    </>
  )
}
