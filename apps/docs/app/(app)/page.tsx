import { Container } from "@/components/shared/container"
import { LogoIcon } from "@/components/shared/logo"

export default function Page() {
  return (
    <Container className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <LogoIcon className="size-120" />
        <h1 className="ml-4 text-2xl font-bold">
          nepui is a work in progress. Check back later for updates!
        </h1>
      </div>
    </Container>
  )
}
