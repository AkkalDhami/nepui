"use client"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/carousel"

export default function CarouselDotsDemo() {
  return (
    <Carousel
      style={{
        width: "calc(100% - 6rem)",
        maxWidth: "20rem",
        marginInline: "auto",
      }}
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
                aspectRatio: 1,
                fontSize: "2.25rem",
              }}
            >
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}
