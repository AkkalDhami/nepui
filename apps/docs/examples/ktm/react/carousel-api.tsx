"use client"

import * as React from "react"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/carousel"

export default function CarouselApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {}

      api.on("select", onStoreChange)
      return () => api.off("select", onStoreChange)
    },
    [api]
  )
  const current = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 1),
    () => 1
  )
  const count = api?.scrollSnapList().length ?? 0

  return (
    <div
      style={{
        width: "calc(100% - 6rem)",
        maxWidth: "20rem",
        marginInline: "auto",
      }}
    >
      <Carousel setApi={setApi}>
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
      </Carousel>
      <p
        aria-live="polite"
        style={{
          margin: "0.75rem 0 0",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "var(--np-muted-foreground)",
        }}
      >
        Slide {current} of {count}
      </p>
    </div>
  )
}
