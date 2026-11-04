"use client"

import type { ComponentProps } from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./tabs.css"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={(state) =>
        cn(
          "np-tabs",
          orientation === "vertical" && "np-tabs-vertical",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

const tabsListVariants = cva("np-tabs-list", {
  variants: {
    variant: {
      default: "",
      line: "np-tabs-line",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type TabsListProps = ComponentProps<typeof TabsPrimitive.List> & {
  variant?: NonNullable<VariantProps<typeof tabsListVariants>["variant"]>
}

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={(state) =>
        cn(
          tabsListVariants({ variant }),
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={(state) =>
        cn(
          "np-tabs-trigger",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={(state) =>
        cn(
          "np-tabs-content",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
