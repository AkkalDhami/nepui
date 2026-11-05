"use client"

import { useState } from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/registry/react/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxMultiple() {
  const anchor = useComboboxAnchor()
  const [value, setValue] = useState<string[]>(["Next.js"])

  return (
    <div style={{ width: "100%", maxWidth: "20rem" }}>
      <Combobox
        items={frameworks}
        multiple
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {value.map((item) => (
              <ComboboxChip key={item} removeLabel={`Remove ${item}`}>
                {item}
              </ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput
            placeholder={value.length > 0 ? "" : "Add framework"}
            aria-label="Frameworks"
          />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
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
