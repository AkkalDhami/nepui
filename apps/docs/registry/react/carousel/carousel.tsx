"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./carousel.css"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type EmblaCompat = {
  canScrollPrev?: () => boolean
  canScrollNext?: () => boolean
  canGoToPrev?: () => boolean
  canGoToNext?: () => boolean
  scrollPrev?: () => void
  scrollNext?: () => void
  goToPrev?: () => void
  goToNext?: () => void
  scrollTo?: (index: number) => void
  goTo?: (index: number) => void
  scrollSnapList?: () => number[]
  selectedScrollSnap?: () => number
}

function compat(api: CarouselApi): EmblaCompat {
  return (api ?? {}) as EmblaCompat
}

function useEmblaValue<T>(
  api: CarouselApi,
  read: (api: EmblaCompat) => T,
  fallback?: T
): T {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("reInit", onChange)
      api.on("select", onChange)
      return () => {
        api.off("reInit", onChange)
        api.off("select", onChange)
      }
    },
    [api]
  )
  const getSnapshot = () => (api ? read(compat(api)) : (fallback as T))
  return React.useSyncExternalStore(subscribe, getSnapshot, () => fallback as T)
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <>
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  )
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  dir,
  onKeyDownCapture,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      direction: dir === "rtl" || dir === "ltr" ? dir : opts?.direction,
    },
    plugins
  )
  const canScrollPrev = useEmblaValue(api, (a) =>
    Boolean(a.canScrollPrev?.() ?? a.canGoToPrev?.())
  )
  const canScrollNext = useEmblaValue(api, (a) =>
    Boolean(a.canScrollNext?.() ?? a.canGoToNext?.())
  )

  const scrollPrev = React.useCallback(() => {
    const a = compat(api)
    if (a.scrollPrev) a.scrollPrev()
    else a.goToPrev?.()
  }, [api])

  const scrollNext = React.useCallback(() => {
    const a = compat(api)
    if (a.scrollNext) a.scrollNext()
    else a.goToNext?.()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const rtl = dir === "rtl" || opts?.direction === "rtl"
      const prevKey =
        orientation === "vertical"
          ? "ArrowUp"
          : rtl
            ? "ArrowRight"
            : "ArrowLeft"
      const nextKey =
        orientation === "vertical"
          ? "ArrowDown"
          : rtl
            ? "ArrowLeft"
            : "ArrowRight"

      if (event.key === prevKey) {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === nextKey) {
        event.preventDefault()
        scrollNext()
      }
    },
    [dir, opts?.direction, orientation, scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={(event) => {
          onKeyDownCapture?.(event)
          if (!event.defaultPrevented) handleKeyDown(event)
        }}
        data-slot="carousel"
        data-orientation={orientation}
        className={cn(
          "np-carousel",
          orientation === "vertical" && "np-carousel-vertical",
          className
        )}
        role="region"
        aria-roledescription="carousel"
        dir={dir}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel()

  return (
    <div
      ref={carouselRef}
      data-slot="carousel-viewport"
      data-embla=""
      className="np-carousel-viewport np-carousel-embla"
    >
      <div
        data-slot="carousel-content"
        className={cn("np-carousel-content", className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("np-carousel-item", className)}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn("np-carousel-previous", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowIcon direction="left" />
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn("np-carousel-next", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ArrowIcon direction="right" />
    </Button>
  )
}

function CarouselDots({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children">) {
  const { api } = useCarousel()
  const count = useEmblaValue(api, (a) => a.scrollSnapList?.().length ?? 0, 0)
  const selected = useEmblaValue(api, (a) => a.selectedScrollSnap?.() ?? 0, 0)

  const goTo = (index: number) => {
    const a = compat(api)
    if (a.scrollTo) a.scrollTo(index)
    else a.goTo?.(index)
  }

  return (
    <div
      data-slot="carousel-dots"
      className={cn("np-carousel-dots", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          data-slot="carousel-dot"
          className="np-carousel-dot"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selected ? "true" : undefined}
          onClick={() => goTo(index)}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
}
