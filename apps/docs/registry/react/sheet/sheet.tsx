"use client"

import type { ComponentProps } from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./sheet.css"

const sheetContentVariants = cva("np-sheet-content", {
  variants: {
    side: {
      top: "np-sheet-top",
      right: "np-sheet-right",
      bottom: "np-sheet-bottom",
      left: "np-sheet-left",
    },
  },
  defaultVariants: {
    side: "right",
  },
})

function XIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />
}

function SheetTrigger(props: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal(props: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose(props: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Backdrop>) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={(state) =>
        cn(
          "np-sheet-overlay",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

type SheetContentProps = ComponentProps<typeof SheetPrimitive.Popup> &
  NonNullable<VariantProps<typeof sheetContentVariants>> & {
    showCloseButton?: boolean
  }

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={(state) =>
          cn(
            sheetContentVariants({ side }),
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            aria-label="Close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="np-sheet-close"
              />
            }
          >
            <XIcon />
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("np-sheet-header", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("np-sheet-footer", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={(state) =>
        cn(
          "np-sheet-title",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={(state) =>
        cn(
          "np-sheet-description",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants,
}
