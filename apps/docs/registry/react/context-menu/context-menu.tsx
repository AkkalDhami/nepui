"use client"

import type { ComponentProps } from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./context-menu.css"

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ChevronRightIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

const contextMenuItemVariants = cva("np-context-menu-item", {
  variants: {
    variant: {
      default: "",
      destructive: "np-context-menu-destructive",
    },
  },
  defaultVariants: { variant: "default" },
})

/** Root of the menu. It has no element of its own. */
const ContextMenu = ContextMenuPrimitive.Root

/** Groups related items. Pair it with `ContextMenuLabel`. */
const ContextMenuGroup = ContextMenuPrimitive.Group

/** Groups radio items. Only one item can be checked. */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

/** Root of a submenu. Wraps a `ContextMenuSubTrigger` and a `ContextMenuSubContent`. */
const ContextMenuSub = ContextMenuPrimitive.SubmenuRoot

/** The area that opens the menu on right click or long press. */
function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={withBase("np-context-menu-trigger", className)}
      {...props}
    />
  )
}

/** The menu. It is rendered in a portal and placed at the pointer. */
function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="np-context-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={withBase("np-context-menu-content", className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

/** The content of a submenu. It opens to the side of its trigger. */
function ContextMenuSubContent({
  className,
  side = "right",
  ...props
}: ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={withBase("np-context-menu-sub-content", className)}
      side={side}
      {...props}
    />
  )
}

/** The item that opens a submenu. It shows a chevron. */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  /** Indent the item so it lines up with items that have an indicator. */
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={withBase("np-context-menu-sub-trigger", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="np-context-menu-sub-indicator" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

/** An action. Closes the menu when it is chosen. */
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  /** Indent the item so it lines up with items that have an indicator. */
  inset?: boolean
  /**
   * Use `destructive` for an action that deletes or removes.
   * @default "default"
   */
  variant?: NonNullable<VariantProps<typeof contextMenuItemVariants>["variant"]>
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={withBase(contextMenuItemVariants({ variant }), className)}
      {...props}
    />
  )
}

/** A toggle item. It shows a check when it is checked. */
function ContextMenuCheckboxItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  /** Indent the item so it lines up with items that have an indicator. */
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={withBase("np-context-menu-checkbox-item", className)}
      {...props}
    >
      <span className="np-context-menu-item-indicator">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

/** An exclusive choice inside a `ContextMenuRadioGroup`. */
function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  /** Indent the item so it lines up with items that have an indicator. */
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset ? "" : undefined}
      className={withBase("np-context-menu-radio-item", className)}
      {...props}
    >
      <span className="np-context-menu-item-indicator">
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

/** A label for a `ContextMenuGroup`. */
function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  /** Indent the label so it lines up with items that have an indicator. */
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset ? "" : undefined}
      className={withBase("np-context-menu-label", className)}
      {...props}
    />
  )
}

/** A line between groups of items. */
function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={withBase("np-context-menu-separator", className)}
      {...props}
    />
  )
}

/** A keyboard hint at the end of an item, such as ⌘R. */
function ContextMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("np-context-menu-shortcut", className)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  contextMenuItemVariants,
}
