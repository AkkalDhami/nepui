"use client"

import type { ComponentProps } from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./menu.css"

type ClassName<State> =
  string | ((state: State) => string | undefined) | undefined

function withClass<State>(base: string, className: ClassName<State>) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

function CheckIcon() {
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
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function Menu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="menu" {...props} />
}

function MenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menu-portal" {...props} />
}

function MenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />
}

function MenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="np-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="menu-content"
          className={withClass("np-menu-content", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function MenuGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="menu-group"
      className={withClass("np-menu-group", className)}
      {...props}
    />
  )
}

function MenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-label"
      data-inset={inset ? "" : undefined}
      className={withClass("np-menu-label", className)}
      {...props}
    />
  )
}

function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={withClass(
        cn(
          "np-menu-item",
          variant === "destructive" && "np-menu-item-destructive"
        ),
        className
      )}
      {...props}
    />
  )
}

function MenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />
}

function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={withClass("np-menu-item np-menu-sub-trigger", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="np-menu-sub-chevron" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: ComponentProps<typeof MenuContent>) {
  return (
    <MenuContent
      data-slot="menu-sub-content"
      className={withClass("np-menu-sub-content", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={withClass("np-menu-item np-menu-checkbox-item", className)}
      checked={checked}
      {...props}
    >
      <span
        className="np-menu-item-indicator"
        data-slot="menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />
}

function MenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      data-inset={inset ? "" : undefined}
      className={withClass("np-menu-item np-menu-radio-item", className)}
      {...props}
    >
      <span
        className="np-menu-item-indicator"
        data-slot="menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      className={withClass("np-menu-separator", className)}
      {...props}
    />
  )
}

/** A keyboard shortcut hint, pushed to the end of the item. */
function MenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn("np-menu-shortcut", className)}
      {...props}
    />
  )
}

export {
  Menu,
  MenuPortal,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
}
