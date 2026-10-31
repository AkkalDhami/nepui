"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cva } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./slider.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const sliderVariants = cva("np-slider", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "np-slider-vertical",
    },
  },
  defaultVariants: { orientation: "horizontal" },
})

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  ...props
}: SliderPrimitive.Root.Props) {
  const current = value ?? defaultValue
  const thumbCount = Array.isArray(current) ? current.length : 1

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={withBase(sliderVariants({ orientation }), className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="np-slider-control"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="np-slider-track"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="np-slider-range"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            className="np-slider-thumb"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider, sliderVariants }
