"use client"

import { Button } from "@/registry/react/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/react/combobox"

const countries = ["Nepal", "India", "Japan", "France", "Brazil", "Kenya"]

export default function ComboboxPopup() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            style={{
              width: "16rem",
              justifyContent: "space-between",
              fontWeight: 400,
            }}
          />
        }
      >
        <ComboboxValue placeholder="Select country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput
          showTrigger={false}
          placeholder="Search"
          aria-label="Search countries"
        />
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
  )
}
