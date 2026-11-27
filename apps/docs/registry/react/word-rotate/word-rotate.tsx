"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./word-rotate.css"

type WordRotateProps = Omit<React.ComponentProps<"span">, "children"> & {
  /** Words to rotate through, in order. Up to 10. */
  words?: string[]
  /** Your own `WordRotateItem` elements, when you need markup inside a word. */
  children?: React.ReactNode
  /** How long each word stays. */
  speed?: "slow" | "default" | "fast"
  /** Set to `false` to show the first word and stop. */
  animated?: boolean
  /** Move words the other way. */
  reverse?: boolean
  /** How a word enters and leaves. */
  variant?: "slide" | "fade" | "flip" | "blur" | "zoom"
  /** Where a word sits when it is narrower than the widest one. */
  align?: "start" | "center" | "end"
  /** Replace the root element. */
  render?: React.ReactElement<React.ComponentProps<"span">>
}

function WordRotate({
  words,
  children,
  speed = "default",
  animated = true,
  reverse = false,
  variant = "slide",
  align = "start",
  render,
  className,
  style,
  ...props
}: WordRotateProps) {
  const merged = {
    "data-slot": "word-rotate",
    "data-speed": speed === "default" ? undefined : speed,
    "data-animate": animated ? undefined : "false",
    "data-direction": reverse ? "reverse" : undefined,
    "data-variant": variant === "slide" ? undefined : variant,
    "data-align": align === "start" ? undefined : align,
    role: words ? "img" : undefined,
    "aria-label": words ? words.join(", ") : undefined,
  }

  const content = words
    ? words.map((word) => <WordRotateItem key={word}>{word}</WordRotateItem>)
    : children

  if (render) {
    return React.cloneElement(
      render,
      {
        ...merged,
        ...props,
        className: cn("np-word-rotate", render.props.className, className),
        style: { ...render.props.style, ...style },
      },
      content
    )
  }

  return (
    <span
      className={cn("np-word-rotate", className)}
      style={style}
      {...merged}
      {...props}
    >
      {content}
    </span>
  )
}

type WordRotateItemProps = React.ComponentProps<"span">

function WordRotateItem({ className, ...props }: WordRotateItemProps) {
  return (
    <span
      className={cn("np-word-rotate-item", className)}
      data-slot="word-rotate-item"
      aria-hidden="true"
      {...props}
    />
  )
}

export { WordRotate, WordRotateItem }
export type { WordRotateProps, WordRotateItemProps }
