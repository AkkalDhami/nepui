import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/carousel"

export default function CarouselOrientationDemo() {
  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start" }}
      style={
        {
          width: "100%",
          maxWidth: "12rem",
          marginBlock: "3rem",
          marginInline: "auto",
          "--np-carousel-height": "12.5rem",
          "--np-carousel-item-basis": "50%",
        } as React.CSSProperties
      }
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                border: "1px solid var(--np-border)",
                borderRadius: "var(--np-radius-xl)",
                background: "var(--np-background)",
                fontWeight: 600,
                height: "100%",
                fontSize: "1.5rem",
              }}
            >
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
