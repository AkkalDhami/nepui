"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./rating.css"

type RatingChangeReason =
  "item-press" | "list-navigation" | "reset" | "imperative"

type RatingChangeDetails = {
  reason: RatingChangeReason
  event?: Event
  readonly canceled: boolean
  cancel: () => void
}

type RatingControllerMethods = {
  getValue: () => number | null
  setValue: (
    value: number | null,
    details?: { reason?: RatingChangeReason; event?: Event }
  ) => boolean
  focus: () => void
}

const attach = Symbol("nepui.rating.attach")

type RatingController = RatingControllerMethods & {
  [attach]: (methods: RatingControllerMethods | null) => void
}

function createRatingController(): RatingController {
  let methods: RatingControllerMethods | null = null
  return {
    [attach]: (next) => {
      methods = next
    },
    getValue: () => methods?.getValue() ?? null,
    setValue: (value, details) => methods?.setValue(value, details) ?? false,
    focus: () => methods?.focus(),
  }
}

type RatingItemState = {
  /** The current score. */
  value: number | null
  /** The score previewed under the pointer. */
  preview: number | null
  disabled: boolean
  readOnly: boolean
  required: boolean
  /** The position of the star, starting at 1. */
  index: number
  /** How much of this star the shown score covers, from 0 to 1. */
  fill: number
  /** Whether the score ends in this star. */
  checked: boolean
  /** Whether a previewed score reaches this star. */
  highlighted: boolean
}

type RatingContextValue = {
  value: number | null
  highlighted: number | null
  max: number
  step: number
  disabled: boolean
  readOnly: boolean
  required: boolean
  deselectable: boolean
  loop: boolean
  form?: string
  getValueLabel: (value: number | null, max: number) => string
  setHighlighted: (value: number | null) => void
  requestChange: (
    value: number | null,
    reason: RatingChangeReason,
    event?: Event
  ) => boolean
  register: (index: number, element: HTMLElement | null) => void
  focusItem: (index: number) => void
}

const RatingContext = React.createContext<RatingContextValue | null>(null)
const RatingIndexContext = React.createContext(1)

function useRating() {
  const context = React.useContext(RatingContext)
  if (!context) {
    throw new Error("RatingItem must be used within a Rating.")
  }
  return context
}

const ratingVariants = cva("np-rating", {
  variants: {
    size: {
      default: "",
      sm: "np-rating-sm",
      lg: "np-rating-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round(value: number) {
  return Number(value.toFixed(6))
}

function isRtl(element: Element) {
  return getComputedStyle(element).direction === "rtl"
}

function defaultValueLabel(value: number | null, max: number) {
  return value == null || value === 0
    ? "No rating"
    : `${value} out of ${max} stars`
}

type RatingProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "children" | "onChange"
> &
  VariantProps<typeof ratingVariants> & {
    /** The score. Use `null` for no score. */
    value?: number | null
    /** The initial score when uncontrolled. A form reset returns to it. */
    defaultValue?: number | null
    /** Called when the score changes. Call `details.cancel()` to stop it. */
    onValueChange?: (value: number | null, details: RatingChangeDetails) => void
    /** The number of stars. */
    max?: number
    /** The smallest change as a fraction of a star. `0.5` gives half stars. */
    step?: number
    /** Lets a press on the checked star clear the score. */
    deselectable?: boolean
    disabled?: boolean
    /** Shows the score as an image. Any value is shown, such as 4.2. */
    readOnly?: boolean
    required?: boolean
    /** The form field name. Without it, nothing is submitted. */
    name?: string
    /** The id of the form the rating belongs to. */
    form?: string
    /** Wraps the arrow keys from the last star to the first. */
    loop?: boolean
    /** Returns the accessible name of a star, and of a read-only rating. */
    getValueLabel?: (value: number | null, max: number) => string
    /** Sets or reads the score from outside. */
    controller?: RatingController
    /** Logs every change and its reason to the console. */
    debug?: boolean
    children?: React.ReactNode
  }

function Rating({
  className,
  size,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  max: maxProp = 5,
  step: stepProp = 1,
  deselectable = false,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  form,
  loop = false,
  getValueLabel = defaultValueLabel,
  controller,
  debug = false,
  children,
  onPointerLeave,
  ...props
}: RatingProps) {
  const max = Math.max(1, Math.floor(maxProp))
  const step = stepProp > 0 && stepProp <= 1 ? stepProp : 1

  const controlled = valueProp !== undefined
  const [inner, setInner] = React.useState<number | null>(defaultValue)
  const raw = controlled ? valueProp : inner
  const value = raw == null || raw <= 0 ? null : Math.min(raw, max)
  const checkedIndex = value == null ? null : Math.ceil(value)

  const [highlighted, setHighlighted] = React.useState<number | null>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const items = React.useRef(new Map<number, HTMLElement>())
  const latest = React.useRef({
    value,
    controlled,
    onValueChange,
    defaultValue,
  })

  React.useLayoutEffect(() => {
    latest.current = { value, controlled, onValueChange, defaultValue }
  })

  const requestChange = React.useCallback(
    (next: number | null, reason: RatingChangeReason, event?: Event) => {
      if (Object.is(next, latest.current.value)) return true
      let canceled = false
      latest.current.onValueChange?.(next, {
        reason,
        event,
        get canceled() {
          return canceled
        },
        cancel: () => {
          canceled = true
        },
      })
      if (canceled) return false
      if (!latest.current.controlled) setInner(next)
      if (debug) console.log("[rating]", reason, next)
      return true
    },
    [debug]
  )

  const register = React.useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) items.current.set(index, element)
      else items.current.delete(index)
    },
    []
  )

  const focusItem = React.useCallback((index: number) => {
    items.current.get(index)?.focus()
  }, [])

  React.useEffect(() => {
    if (!controller) return
    controller[attach]({
      getValue: () => latest.current.value,
      setValue: (next, details) => {
        if (disabled || readOnly) return false
        const snapped =
          next == null || next <= 0
            ? null
            : round(Math.round(clamp(next, 0, max) / step) * step) || null
        return requestChange(
          snapped,
          details?.reason ?? "imperative",
          details?.event
        )
      },
      focus: () => {
        const current = latest.current.value
        focusItem(current == null ? 1 : Math.ceil(current))
      },
    })
    return () => controller[attach](null)
  }, [controller, disabled, readOnly, max, step, requestChange, focusItem])

  React.useEffect(() => {
    const formElement = inputRef.current?.form
    if (!formElement) return
    const onReset = (event: Event) => {
      requestChange(latest.current.defaultValue ?? null, "reset", event)
    }
    formElement.addEventListener("reset", onReset)
    return () => formElement.removeEventListener("reset", onReset)
  }, [requestChange, name, form])

  const context: RatingContextValue = {
    value,
    highlighted,
    max,
    step,
    disabled,
    readOnly,
    required,
    deselectable,
    loop,
    form,
    getValueLabel,
    setHighlighted,
    requestChange,
    register,
    focusItem,
  }

  const content = children ?? <RatingItem />

  return (
    <RatingContext.Provider value={context}>
      <div
        data-slot="rating"
        data-required={required ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-previewing={highlighted != null ? "" : undefined}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={readOnly ? getValueLabel(value, max) : undefined}
        aria-required={!readOnly && required ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        className={cn(ratingVariants({ size }), className)}
        onPointerLeave={(event) => {
          onPointerLeave?.(event)
          setHighlighted(null)
        }}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => (
          <RatingIndexContext.Provider key={index} value={index + 1}>
            {content}
          </RatingIndexContext.Provider>
        ))}
        {(name || required) && (
          <input
            ref={inputRef}
            data-slot="rating-input"
            className="np-rating-input"
            tabIndex={-1}
            aria-hidden="true"
            name={name}
            form={form}
            required={required}
            disabled={disabled || (value == null && !required)}
            value={value ?? ""}
            onChange={() => {}}
            onFocus={() => focusItem(checkedIndex ?? 1)}
          />
        )}
      </div>
    </RatingContext.Provider>
  )
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  )
}

type RatingItemProps = Omit<React.ComponentProps<"button">, "children"> & {
  /** An icon, or a function that returns one from the star's state. */
  children?: React.ReactNode | ((state: RatingItemState) => React.ReactNode)
}

function RatingItem({
  className,
  children,
  onClick,
  onKeyDown,
  onPointerMove,
  ...props
}: RatingItemProps) {
  const rating = useRating()
  const index = React.useContext(RatingIndexContext)
  const { value, highlighted, max, step, disabled, readOnly } = rating

  const shown = highlighted ?? value ?? 0
  const fill = round(clamp(shown - (index - 1), 0, 1))
  const checked = value != null && Math.ceil(value) === index

  const state: RatingItemState = {
    value,
    preview: highlighted,
    disabled,
    readOnly,
    required: rating.required,
    index,
    fill,
    checked,
    highlighted: highlighted != null && fill > 0,
  }

  const icon =
    typeof children === "function"
      ? children(state)
      : (children ?? <StarIcon />)

  const attributes = {
    "data-slot": "rating-item",
    "data-filled": fill === 1 ? "" : undefined,
    "data-partial": fill > 0 && fill < 1 ? "" : undefined,
    "data-checked": checked ? "" : undefined,
    "data-highlighted": state.highlighted ? "" : undefined,
    "data-disabled": disabled ? "" : undefined,
    "data-readonly": readOnly ? "" : undefined,
    className: cn("np-rating-item", className),
    style: { "--np-rating-fill": fill } as React.CSSProperties,
  }

  const layers = (
    <>
      <span className="np-rating-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="np-rating-icon np-rating-icon-fill" aria-hidden="true">
        {icon}
      </span>
    </>
  )

  if (readOnly) {
    return (
      <span {...attributes} aria-hidden="true">
        {layers}
      </span>
    )
  }

  const valueAt = (event: React.PointerEvent | React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    let position = rect.width ? (event.clientX - rect.left) / rect.width : 1
    if (isRtl(event.currentTarget)) position = 1 - position
    const steps = Math.max(1, Math.ceil(clamp(position, 0, 1) / step - 1e-9))
    return round(index - 1 + Math.min(1, steps * step))
  }

  const isTabStop = checked || (value == null && index === 1)

  return (
    <button
      ref={(element) => {
        rating.register(index, element)
        return () => rating.register(index, null)
      }}
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={rating.getValueLabel(checked ? value : index, max)}
      tabIndex={isTabStop ? 0 : -1}
      disabled={disabled}
      {...attributes}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (event.pointerType === "touch") return
        rating.setHighlighted(valueAt(event))
      }}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        let next: number | null =
          event.detail === 0 ? (checked ? value : index) : valueAt(event)
        if (rating.deselectable && Object.is(next, value)) next = null
        rating.requestChange(next, "item-press", event.nativeEvent)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return

        if (event.key === "Enter") {
          event.preventDefault()
          const formElement = rating.form
            ? (document.getElementById(rating.form) as HTMLFormElement | null)
            : event.currentTarget.form
          formElement?.requestSubmit()
          return
        }

        const rtl = isRtl(event.currentTarget)
        const direction = {
          ArrowRight: rtl ? -1 : 1,
          ArrowLeft: rtl ? 1 : -1,
          ArrowUp: 1,
          ArrowDown: -1,
        }[event.key]

        let next: number | null = null
        if (event.key === "Home") next = step
        else if (event.key === "End") next = max
        else if (direction !== undefined) {
          const moved = round((value ?? 0) + direction * step)
          if (moved > max) next = rating.loop ? step : max
          else if (moved < step) next = rating.loop ? max : value
          else next = moved
        } else return

        event.preventDefault()
        rating.setHighlighted(null)
        if (next == null || Object.is(next, value)) return
        if (rating.requestChange(next, "list-navigation", event.nativeEvent)) {
          rating.focusItem(Math.ceil(next))
        }
      }}
      {...props}
    >
      {layers}
    </button>
  )
}

export { Rating, RatingItem, createRatingController, ratingVariants }
export type {
  RatingChangeDetails,
  RatingChangeReason,
  RatingController,
  RatingItemProps,
  RatingItemState,
  RatingProps,
}
