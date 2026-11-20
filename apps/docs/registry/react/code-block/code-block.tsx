"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./code-block.css"

const codeBlockVariants = cva("np-code-block", {
  variants: {
    variant: {
      default: "",
      destructive: "np-code-block-destructive",
    },
    size: {
      default: "",
      sm: "np-code-block-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const codeBlockLineVariants = cva("np-code-block-line", {
  variants: {
    variant: {
      default: "",
      highlighted: "np-code-block-line-highlighted",
      added: "np-code-block-line-added",
      removed: "np-code-block-line-removed",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/** Tiny inline icons, so the component needs no icon library. */
function CopyIcon() {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

type CodeBlockProps = React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants>

/**
 * The frame around the code. `variant="destructive"` is for errors and
 * `size="sm"` is for tool output.
 */
function CodeBlock({
  className,
  variant = "default",
  size = "default",
  ...props
}: CodeBlockProps) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/** The bar above the code. It holds the title and the actions. */
function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn("np-code-block-header", className)}
      {...props}
    />
  )
}

/** A file name or a label. A long one is cut off with an ellipsis. */
function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-title"
      className={cn("np-code-block-title", className)}
      {...props}
    />
  )
}

/**
 * A row of buttons. Inside the header it sits at the end. As a direct child
 * of `CodeBlock` it floats over the corner and shows on hover or focus.
 */
function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn("np-code-block-actions", className)}
      {...props}
    />
  )
}

type CodeBlockCopyButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children"
> & {
  /** The text that is copied. */
  value: string
}

/** Copies `value` to the clipboard and shows a check for two seconds. */
function CodeBlockCopyButton({
  value,
  className,
  onClick,
  ...props
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => () => clearTimeout(timeout.current), [])

  async function copy(
    event: Parameters<
      NonNullable<React.ComponentProps<typeof Button>["onClick"]>
    >[0]
  ) {
    onClick?.(event)
    if (event.defaultPrevented) return
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Button
        data-slot="code-block-copy"
        data-copied={copied ? "" : undefined}
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Copy"
        className={cn("np-code-block-copy", className)}
        onClick={copy}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span role="status" className="np-code-block-sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  )
}

type CodeBlockContentProps = Omit<React.ComponentProps<"pre">, "children"> & {
  /** A string, or a list of `CodeBlockLine`. */
  children?: React.ReactNode
  /** Wrap long lines instead of scrolling. @default false */
  wrap?: boolean
  /** Show line numbers. @default false */
  lineNumbers?: boolean
  /** The number of the first line. @default 1 */
  startLine?: number
}

/**
 * The code. A string renders as one text node, which keeps streaming cheap.
 * With `lineNumbers`, a string is split into lines. Pass `CodeBlockLine`
 * children for diff lines, highlighted lines and highlighted tokens.
 */
function CodeBlockContent({
  className,
  style,
  children,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  tabIndex = 0,
  ...props
}: CodeBlockContentProps) {
  // One trailing newline is ignored.
  const text = typeof children === "string" ? children.replace(/\n$/, "") : null
  const count =
    text !== null ? text.split("\n").length : React.Children.count(children)
  const digits = String(startLine + Math.max(count, 1) - 1).length

  let body: React.ReactNode = children
  if (text !== null) {
    body = lineNumbers
      ? text
          .split("\n")
          .map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))
      : text
  }

  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap ? "" : undefined}
      data-line-numbers={lineNumbers ? "" : undefined}
      dir="ltr"
      tabIndex={tabIndex}
      className={cn("np-code-block-content", className)}
      style={
        {
          "--np-code-block-start": startLine,
          "--np-code-block-gutter": `${digits}ch`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <code>{body}</code>
    </pre>
  )
}

type CodeBlockLineProps = React.ComponentProps<"span"> &
  VariantProps<typeof codeBlockLineVariants>

/** One line of code. `added` and `removed` add a marker, so colour is not the only cue. */
function CodeBlockLine({
  className,
  variant = "default",
  ...props
}: CodeBlockLineProps) {
  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    />
  )
}

/** A row under the code, for a "Show more" button for example. */
function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn("np-code-block-footer", className)}
      {...props}
    />
  )
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  codeBlockLineVariants,
  codeBlockVariants,
}
export type {
  CodeBlockContentProps,
  CodeBlockCopyButtonProps,
  CodeBlockLineProps,
  CodeBlockProps,
}
