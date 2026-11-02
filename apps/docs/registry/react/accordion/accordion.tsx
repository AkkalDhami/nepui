"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./accordion.css"

type AccordionProps = AccordionPrimitive.Root.Props & {
  variant?: "default" | "bordered"
}

function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={(state) =>
        cn(
          "np-accordion",
          variant === "bordered" && "np-accordion-bordered",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={(state) =>
        cn(
          "np-accordion-item",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="np-accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={(state) =>
          cn(
            "np-accordion-trigger",
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={(state) =>
        cn(
          "np-accordion-content",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
