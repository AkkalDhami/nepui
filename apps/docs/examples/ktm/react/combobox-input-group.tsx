"use client"

import { GlobeIcon } from "@phosphor-icons/react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/react/combobox"
import { InputGroupAddon } from "@/registry/react/input-group"

const countries = ["Nepal", "India", "Japan", "France", "Brazil", "Kenya"]

export default function ComboboxInputGroup() {
  return (
    <div style={{ width: "100%", maxWidth: "16rem" }}>
      <Combobox items={countries}>
        <ComboboxInput placeholder="Select a country" aria-label="Country">
          <InputGroupAddon>
            <GlobeIcon />
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
