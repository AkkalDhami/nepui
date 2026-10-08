import { Container } from "@/components/shared/container"
import { LogoIcon } from "@/components/shared/logo"
import { Heading } from "@/components/ui/heading"

export default function Page() {
  return (
    <Container className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <Heading as="h1" className="ml-4 text-5xl font-bold">
          The Foundation of Your Design System
        </Heading>
        <LogoIcon className="size-100" />
      </div>
    </Container>
  )
}
