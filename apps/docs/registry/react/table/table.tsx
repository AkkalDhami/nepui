"use client"

import type { ComponentProps } from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./table.css"

type TableAlign = "start" | "center" | "end"

const alignClass: Record<TableAlign, string> = {
  start: "",
  center: "np-table-center",
  end: "np-table-end",
}

type TableProps = ComponentProps<"table"> & {
  containerClassName?: string
}

function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn("np-table-container", containerClassName)}
    >
      <table
        data-slot="table"
        className={cn("np-table", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("np-table-header", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("np-table-body", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("np-table-footer", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("np-table-row", className)}
      {...props}
    />
  )
}

type TableHeadProps = Omit<ComponentProps<"th">, "align"> & {
  align?: TableAlign
}

function TableHead({ className, align = "start", ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-align={align === "start" ? undefined : align}
      className={cn("np-table-head", alignClass[align], className)}
      {...props}
    />
  )
}

type TableCellProps = Omit<ComponentProps<"td">, "align"> & {
  align?: TableAlign
}

function TableCell({ className, align = "start", ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-align={align === "start" ? undefined : align}
      className={cn("np-table-cell", alignClass[align], className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("np-table-caption", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
export type { TableAlign }
