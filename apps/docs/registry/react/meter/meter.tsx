"use client"

import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./meter.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const meterVariants = cva("np-meter", {
  variants: {
    variant: {
      default: "",
      success: "np-meter-success",
      warning: "np-meter-warning",
      destructive: "np-meter-destructive",
    },
    size: {
      default: "",
      sm: "np-meter-sm",
      lg: "np-meter-lg",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type MeterProps = MeterPrimitive.Root.Props & {
  variant?: NonNullable<VariantProps<typeof meterVariants>["variant"]>
  size?: NonNullable<VariantProps<typeof meterVariants>["size"]>
}

function Meter({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: MeterProps) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      data-variant={variant}
      data-size={size}
      className={withBase(meterVariants({ variant, size }), className)}
      {...props}
    >
      {children ?? (
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      )}
    </MeterPrimitive.Root>
  )
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={withBase("np-meter-track", className)}
      {...props}
    />
  )
}

function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={withBase("np-meter-indicator", className)}
      {...props}
    />
  )
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={withBase("np-meter-label", className)}
      {...props}
    />
  )
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={withBase("np-meter-value", className)}
      {...props}
    />
  )
}

export {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  meterVariants,
}

export type { MeterProps }
