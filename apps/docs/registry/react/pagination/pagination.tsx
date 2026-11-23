"use client"

import type { ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import { buttonVariants } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./pagination.css"

type PaginationLinkSize = NonNullable<
  NonNullable<Parameters<typeof buttonVariants>[0]>["size"]
>

function ChevronLeftIcon(props: ComponentProps<"svg">) {
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
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: ComponentProps<"svg">) {
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
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function MoreHorizontalIcon(props: ComponentProps<"svg">) {
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
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("np-pagination", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("np-pagination-content", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("np-pagination-item", className)}
      {...props}
    />
  )
}

type PaginationLinkProps = useRender.ComponentProps<"a"> & {
  isActive?: boolean
  size?: PaginationLinkSize
}

function PaginationLink({
  className,
  isActive = false,
  size = "icon",
  render,
  ...props
}: PaginationLinkProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
          "np-pagination-link",
          className
        ),
        "aria-current": isActive ? "page" : undefined,
        "data-slot": "pagination-link",
      } as ComponentProps<"a">,
      props
    ),
  })
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: ComponentProps<typeof PaginationLink> & {
  text?: string
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      data-slot="pagination-previous"
      className={cn("np-pagination-previous", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="np-pagination-text">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: ComponentProps<typeof PaginationLink> & {
  text?: string
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      data-slot="pagination-next"
      className={cn("np-pagination-next", className)}
      {...props}
    >
      <span className="np-pagination-text">{text}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("np-pagination-ellipsis", className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="np-pagination-sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
