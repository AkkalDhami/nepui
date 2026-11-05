"use client"

import { SVGProps, useRef, type ComponentPropsWithRef } from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { cn } from "cn"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/react/input-group"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./combobox.css"

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  )
}

function withClass<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={withClass("np-combobox-trigger", className)}
      {...props}
    />
  )
}

function ComboboxClear({
  className,
  "aria-label": ariaLabel = "Clear",
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      aria-label={ariaLabel}
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={withClass("np-combobox-clear", className)}
      {...props}
    >
      <XIcon />
    </ComboboxPrimitive.Clear>
  )
}

type ComboboxInputProps = Omit<ComboboxPrimitive.Input.Props, "className"> & {
  className?: string
  showTrigger?: boolean
  showClear?: boolean
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) {
  return (
    <InputGroup className={cn("np-combobox-input", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <ComboboxTrigger
            aria-label="Open options"
            render={
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                data-slot="input-group-button"
                disabled={disabled}
              />
            }
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="np-combobox-positioner"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={anchor ? "" : undefined}
          className={withClass("np-combobox-content", className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={withClass("np-combobox-list", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={withClass("np-combobox-item", className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator className="np-combobox-item-indicator">
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={withClass("np-combobox-group", className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={withClass("np-combobox-label", className)}
      {...props}
    />
  )
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={withClass("np-combobox-empty", className)}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={withClass("np-combobox-separator", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={withClass("np-combobox-chips", className)}
      {...props}
    />
  )
}

type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
  removeLabel?: string
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  removeLabel = "Remove",
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={withClass("np-combobox-chip", className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          data-slot="combobox-chip-remove"
          aria-label={removeLabel}
          className="np-combobox-chip-remove"
        />
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={withClass("np-combobox-chips-input", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
export type { ComboboxChipProps, ComboboxContentProps, ComboboxInputProps }
