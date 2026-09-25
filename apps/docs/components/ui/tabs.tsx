"use client"

import * as React from "react"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { type VariantProps, cva } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  layoutId?: string
  variant?: "default" | "line"
}>({})

export type TabsProps = TabsPrimitive.Root.Props

function Tabs({
  className,
  orientation = "horizontal",
  children,
  ...props
}: TabsProps) {
  const layoutId = React.useId()

  return (
    <TabsContext.Provider value={{ layoutId }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center justify-center rounded-md p-[3px] text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsListProps
  extends TabsPrimitive.List.Props, VariantProps<typeof tabsListVariants> {}

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsListProps) {
  const parentContext = React.useContext(TabsContext)

  return (
    <TabsContext.Provider
      value={{ ...parentContext, variant: variant ?? "default" }}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsContext.Provider>
  )
}

export type TabsTriggerProps = TabsPrimitive.Tab.Props

function TabsTrigger({ className, children, ...props }: TabsTriggerProps) {
  const parentContext = React.useContext(TabsContext)
  const layoutId = parentContext.layoutId
  const variant = parentContext.variant ?? "default"

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      {...props}
      render={(tabProps, state) => (
        <button
          {...tabProps}
          className={cn(
            "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors outline-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            state.active && "font-medium text-foreground dark:text-foreground",
            className
          )}
        >
          {state.active &&
            (variant === "line" ? (
              <motion.div
                layoutId={`${layoutId}-indicator`}
                className="absolute bg-foreground group-data-[orientation=horizontal]/tabs:inset-x-0 group-data-[orientation=horizontal]/tabs:-bottom-px group-data-[orientation=horizontal]/tabs:h-0.5 group-data-[orientation=vertical]/tabs:inset-y-0 group-data-[orientation=vertical]/tabs:-right-px group-data-[orientation=vertical]/tabs:w-0.5"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : (
              <motion.div
                layoutId={`${layoutId}-pill`}
                className="absolute inset-0 -z-10 rounded-md bg-input shadow-xs"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ))}
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            {children}
          </span>
        </button>
      )}
    />
  )
}

export type TabsContentProps = TabsPrimitive.Panel.Props

function TabsContent({ className, children, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      keepMounted
      {...props}
      render={(panelProps, state) => (
        <div
          {...panelProps}
          className={cn(
            "flex-1 overflow-hidden text-sm outline-none",
            className
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!state.hidden && (
              <motion.div
                key={props.value ?? "tab-panel"}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
