"use client"

import type { ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./breadcrumb.css"

/** The navigation landmark that wraps the whole breadcrumb. */
function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn("np-breadcrumb", className)}
      {...props}
    />
  )
}

/** The ordered list of items and separators. */
function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("np-breadcrumb-list", className)}
      {...props}
    />
  )
}

/** Wraps one link, the current page, or an ellipsis. */
function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("np-breadcrumb-item", className)}
      {...props}
    />
  )
}

/**
 * A link to an earlier page. Renders an `<a>`, pass `render` to use the link
 * component of your router instead.
 */
function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      { className: cn("np-breadcrumb-link", className) },
      props
    ),
    render,
    state: { slot: "breadcrumb-link" },
  })
}

/** The current page. It is not a link. */
function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("np-breadcrumb-page", className)}
      {...props}
    />
  )
}

/**
 * Sits between two items. Empty, it draws a chevron that follows the text
 * direction. Pass `children` for a custom separator.
 */
function BreadcrumbSeparator({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("np-breadcrumb-separator", className)}
      {...props}
    />
  )
}

type BreadcrumbEllipsisProps = useRender.ComponentProps<"span"> & {
  /**
   * Text for screen readers. Also the accessible name when the ellipsis is
   * rendered as a button.
   * @default "More"
   */
  label?: string
}

/**
 * Stands in for items that are hidden. Pass
 * `render={<button type="button" />}` to make it expand them.
 */
function BreadcrumbEllipsis({
  className,
  render,
  label = "More",
  children,
  ...props
}: BreadcrumbEllipsisProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn("np-breadcrumb-ellipsis", className),
        children: children ?? (
          <span className="np-breadcrumb-ellipsis-label">{label}</span>
        ),
      },
      props
    ),
    render,
    state: { slot: "breadcrumb-ellipsis" },
  })
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
export type { BreadcrumbEllipsisProps }
