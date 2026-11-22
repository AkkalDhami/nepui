"use client"

import { createContext, useContext, useId, type ComponentProps } from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Label } from "@/registry/react/label"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./number-input.css"

const numberInputVariants = cva("np-number-input", {
  variants: {
    size: {
      default: "",
      xs: "np-number-input-xs",
      sm: "np-number-input-sm",
      lg: "np-number-input-lg",
    },
    layout: {
      split: "",
      stacked: "np-number-input-stacked",
    },
  },
  defaultVariants: {
    size: "default",
    layout: "split",
  },
})

type NumberInputVariantProps = VariantProps<typeof numberInputVariants>

interface NumberInputContextValue {
  id: string
  layout: NonNullable<NumberInputVariantProps["layout"]>
}

const NumberInputContext = createContext<NumberInputContextValue | null>(null)

function resolveClassName<State>(
  base: string,
  className: string | ((state: State) => string | undefined) | undefined
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CursorIcon() {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      aria-hidden="true"
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  )
}

type NumberInputProps = NumberFieldPrimitive.Root.Props & {
  /** Height, radius and font size of the control. */
  size?: NonNullable<NumberInputVariantProps["size"]>
  /** `split` puts the buttons on both sides; `stacked` stacks them at the end. */
  layout?: NonNullable<NumberInputVariantProps["layout"]>
}

function NumberInput({
  className,
  size,
  layout,
  id,
  ...props
}: NumberInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <NumberInputContext.Provider
      value={{ id: inputId, layout: layout ?? "split" }}
    >
      <NumberFieldPrimitive.Root
        data-slot="number-input"
        data-size={size}
        data-layout={layout}
        id={inputId}
        className={resolveClassName(
          numberInputVariants({ size, layout }),
          className
        )}
        {...props}
      />
    </NumberInputContext.Provider>
  )
}

function NumberInputGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-input-group"
      className={resolveClassName("np-number-input-group", className)}
      {...props}
    />
  )
}

function NumberInputInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-input-input"
      className={resolveClassName("np-number-input-input", className)}
      {...props}
    />
  )
}

function NumberInputIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  const context = useContext(NumberInputContext)

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-input-increment"
      aria-label="Increase"
      className={resolveClassName("np-number-input-increment", className)}
      {...props}
    >
      {children ??
        (context?.layout === "stacked" ? <ChevronUpIcon /> : <PlusIcon />)}
    </NumberFieldPrimitive.Increment>
  )
}

function NumberInputDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  const context = useContext(NumberInputContext)

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-input-decrement"
      aria-label="Decrease"
      className={resolveClassName("np-number-input-decrement", className)}
      {...props}
    >
      {children ??
        (context?.layout === "stacked" ? <ChevronDownIcon /> : <MinusIcon />)}
    </NumberFieldPrimitive.Decrement>
  )
}

type NumberInputScrubAreaProps = NumberFieldPrimitive.ScrubArea.Props & {
  /** Label text. It is tied to the input through the root `id`. */
  label?: ComponentProps<typeof Label>["children"]
  /** Show a custom cursor while scrubbing. */
  cursor?: boolean
}

function NumberInputScrubArea({
  className,
  children,
  label,
  cursor = true,
  direction,
  ...props
}: NumberInputScrubAreaProps) {
  const context = useContext(NumberInputContext)

  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-input-scrub-area"
      data-direction={direction}
      direction={direction}
      className={resolveClassName("np-number-input-scrub-area", className)}
      {...props}
    >
      {label !== undefined && <Label htmlFor={context?.id}>{label}</Label>}
      {children}
      {cursor && (
        <NumberFieldPrimitive.ScrubAreaCursor
          data-slot="number-input-cursor"
          className="np-number-input-cursor"
        >
          <CursorIcon />
        </NumberFieldPrimitive.ScrubAreaCursor>
      )}
    </NumberFieldPrimitive.ScrubArea>
  )
}

export {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
  NumberInputScrubArea,
  numberInputVariants,
}

export type { NumberInputProps, NumberInputScrubAreaProps }
