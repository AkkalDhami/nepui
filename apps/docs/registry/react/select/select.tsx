/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type { ComponentProps } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./select.css"

function IconBase(props: ComponentProps<"svg">) {
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
    />
  )
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <IconBase {...props}>
      <path d="M20 6 9 17l-5-5" />
    </IconBase>
  )
}

function ChevronDownIcon(props: ComponentProps<"svg">) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  )
}

function ChevronUpIcon(props: ComponentProps<"svg">) {
  return (
    <IconBase {...props}>
      <path d="m18 15-6-6-6 6" />
    </IconBase>
  )
}

function withBase<State>(
  base: string,
  className?: string | ((state: State) => string | undefined)
) {
  return (state: State) =>
    cn(base, typeof className === "function" ? className(state) : className)
}

const selectVariants = cva("np-select", {
  variants: {
    size: {
      xs: "np-select-xs",
      sm: "np-select-sm",
      default: "",
      lg: "np-select-lg",
    },
  },
  defaultVariants: { size: "default" },
})

type SelectSize = NonNullable<VariantProps<typeof selectVariants>["size"]>

type SelectBaseProps<
  Value,
  Multiple extends boolean | undefined,
> = SelectPrimitive.Root.Props<Value, Multiple> & {
  native?: false
}

type SelectNativeProps = Omit<ComponentProps<"select">, "size" | "multiple"> & {
  native: true
  size?: SelectSize
  placeholder?: string
  wrapperClassName?: string
}

type SelectProps<Value = string, Multiple extends boolean | undefined = false> =
  SelectBaseProps<Value, Multiple> | SelectNativeProps

function NativeSelect({
  className,
  wrapperClassName,
  size = "default",
  placeholder,
  value,
  defaultValue,
  children,
  ...props
}: Omit<SelectNativeProps, "native">) {
  const startOnPlaceholder =
    placeholder !== undefined &&
    value === undefined &&
    defaultValue === undefined

  return (
    <div
      data-slot="select-wrapper"
      className={cn("np-select-wrapper", wrapperClassName)}
    >
      <select
        data-slot="select"
        data-size={size}
        className={cn(selectVariants({ size }), className)}
        value={value}
        defaultValue={startOnPlaceholder ? "" : defaultValue}
        {...props}
      >
        {placeholder !== undefined && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  )
}

function Select<Value = string, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>
) {
  if (props.native) {
    const { native: _native, ...nativeProps } = props
    return <NativeSelect {...nativeProps} />
  }

  const { native: _native, ...rootProps } = props
  return <SelectPrimitive.Root {...rootProps} />
}

function SelectOption(props: ComponentProps<"option">) {
  return <option data-slot="select-option" {...props} />
}

function SelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup data-slot="select-optgroup" {...props} />
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={withBase("np-select-group", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={withBase("np-select-value", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: SelectSize
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select"
      data-size={size}
      className={withBase(selectVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="np-select-icon">
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="np-select-positioner"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger ? "" : undefined}
          className={withBase("np-select-content", className)}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="np-select-list">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={withBase("np-select-label", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={withBase("np-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="np-select-item-text">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="np-select-item-indicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={withBase("np-select-separator", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={withBase("np-select-scroll-up", className)}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={withBase("np-select-scroll-down", className)}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectOptGroup,
  SelectOption,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectVariants,
}
export type { SelectProps, SelectSize }
