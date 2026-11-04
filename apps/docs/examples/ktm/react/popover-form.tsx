"use client"

import { Input } from "@/registry/react/input"
import { Button } from "@/registry/react/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/react/popover"
import { Field, FieldGroup, FieldLabel } from "@/registry/react/field"

export default function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent style={{ width: "20rem" }}>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="popover-width">Width</FieldLabel>
            <Input id="popover-width" defaultValue="100%" />
          </Field>
          <Field>
            <FieldLabel htmlFor="popover-height">Height</FieldLabel>
            <Input id="popover-height" defaultValue="25px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}
