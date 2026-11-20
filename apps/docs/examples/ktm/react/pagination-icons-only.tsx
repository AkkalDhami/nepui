"use client"

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

import { Field, FieldLabel } from "@/registry/react/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/react/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/select"

export default function PaginationIconsOnly() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Field orientation="horizontal" style={{ width: "fit-content" }}>
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue="25">
          <SelectTrigger id="select-rows-per-page" style={{ width: "5rem" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Pagination style={{ width: "auto", marginInline: "0" }}>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Go to previous page">
              <CaretLeftIcon />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Go to next page">
              <CaretRightIcon />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
