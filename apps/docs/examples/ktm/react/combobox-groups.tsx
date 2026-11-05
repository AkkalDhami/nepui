"use client"

import { Fragment } from "react"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/registry/react/combobox"

const produce = [
  { value: "Fruits", items: ["Apple", "Banana", "Orange"] },
  { value: "Vegetables", items: ["Carrot", "Lettuce", "Spinach"] },
]

export default function ComboboxGroups() {
  return (
    <div style={{ width: "100%", maxWidth: "16rem" }}>
      <Combobox items={produce}>
        <ComboboxInput placeholder="Select produce" aria-label="Produce" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(group, index) => (
              <Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
                {index < produce.length - 1 && <ComboboxSeparator />}
              </Fragment>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
