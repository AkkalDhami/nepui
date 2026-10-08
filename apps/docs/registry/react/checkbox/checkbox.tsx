"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./checkbox.css"

export type CheckboxProps = CheckboxPrimitive.Root.Props

function IconBase(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <IconBase {...props}>
      <path d="M20 6 9 17l-5-5" />
    </IconBase>
  )
}

function MinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
    </IconBase>
  )
}

function Checkbox({ className, ...props }: CheckboxProps) {
  const Icon = props.indeterminate ? MinusIcon : CheckIcon

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={(state) =>
        cn(
          "np-checkbox",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="np-checkbox-indicator"
      >
        <Icon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
