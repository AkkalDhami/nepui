"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import { ScrollArea } from "@/registry/react/scroll-area"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./drawer.css"

type SwipeDirection = "up" | "down" | "left" | "right"
type DrawerSide = "top" | "bottom" | "left" | "right"

const SIDE_BY_DIRECTION: Record<SwipeDirection, DrawerSide> = {
  down: "bottom",
  up: "top",
  left: "left",
  right: "right",
}

const DrawerContext = React.createContext<{
  swipeDirection: SwipeDirection
  showSwipeHandle: boolean
}>({ swipeDirection: "down", showSwipeHandle: false })

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  showSwipeHandle?: boolean
}

function Drawer({
  swipeDirection = "down",
  showSwipeHandle = false,
  ...props
}: DrawerProps) {
  const value = React.useMemo(
    () => ({ swipeDirection, showSwipeHandle }),
    [swipeDirection, showSwipeHandle]
  )

  return (
    <DrawerContext.Provider value={value}>
      <DrawerPrimitive.Root swipeDirection={swipeDirection} {...props} />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>
) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>
) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.Close>
) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={(state) =>
        cn(
          "np-drawer-overlay",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      className={cn("np-drawer-handle", className)}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Popup>) {
  const { swipeDirection, showSwipeHandle } = React.useContext(DrawerContext)
  const side = SIDE_BY_DIRECTION[swipeDirection]

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="np-drawer-viewport"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-side={side}
          className={(state) =>
            cn(
              "np-drawer-content",
              `np-drawer-${side}`,
              typeof className === "function" ? className(state) : className
            )
          }
          {...props}
        >
          {showSwipeHandle ? <DrawerSwipeHandle /> : null}
          <DrawerPrimitive.Content
            data-slot="drawer-inner"
            className="np-drawer-inner"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("np-drawer-header", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("np-drawer-footer", className)}
      {...props}
    />
  )
}

function DrawerPanel({
  className,
  scrollFade = true,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean
  scrollable?: boolean
  allowSelection?: boolean
}): React.ReactElement {
  const defaultProps = {
    className: cn("np-drawer-panel", className),
    "data-slot": "drawer-panel",
    "data-allow-selection": allowSelection ? undefined : "false",
  }

  const content = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? (
      <DrawerPrimitive.Content render={render} />
    ) : (
      render
    ),
  })

  if (scrollable) {
    return (
      <ScrollArea className="np-drawer-scroll" fade={scrollFade}>
        {content}
      </ScrollArea>
    )
  }

  return content
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={(state) =>
        cn(
          "np-drawer-title",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={(state) =>
        cn(
          "np-drawer-description",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPanel,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
}
