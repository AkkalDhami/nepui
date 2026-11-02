"use client"

import { createContext, useContext, type ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Separator } from "@/registry/react/separator"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./item.css"

const ItemGroupContext = createContext(false)

const itemVariants = cva("np-item", {
  variants: {
    variant: {
      default: "",
      outline: "np-item-outline",
      muted: "np-item-muted",
    },
    size: {
      default: "",
      sm: "np-item-sm",
      xs: "np-item-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const itemMediaVariants = cva("np-item-media", {
  variants: {
    variant: {
      default: "",
      icon: "np-item-media-icon",
      image: "np-item-media-image",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function ItemGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <ItemGroupContext.Provider value={true}>
      <div
        role="list"
        data-slot="item-group"
        className={cn("np-item-group", className)}
        {...props}
      />
    </ItemGroupContext.Provider>
  )
}

function ItemSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("np-item-separator", className)}
      {...props}
    />
  )
}

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  const inGroup = useContext(ItemGroupContext)

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size }), className),
        role: inGroup && !render ? "listitem" : undefined,
        "data-slot": "item",
        "data-variant": variant,
        "data-size": size,
      } as ComponentProps<"div">,
      props
    ),
    render,
    state: { slot: "item", variant, size },
  })
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("np-item-content", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("np-item-title", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn("np-item-description", className)}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("np-item-actions", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("np-item-header", className)}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn("np-item-footer", className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  itemMediaVariants,
  itemVariants,
}
