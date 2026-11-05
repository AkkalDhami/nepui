"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/react/combobox"

type Country = { value: string; label: string; continent: string }

const countries: Country[] = [
  { value: "np", label: "Nepal", continent: "Asia" },
  { value: "jp", label: "Japan", continent: "Asia" },
  { value: "fr", label: "France", continent: "Europe" },
  { value: "br", label: "Brazil", continent: "South America" },
  { value: "ke", label: "Kenya", continent: "Africa" },
]

export default function ComboboxCustom() {
  return (
    <div style={{ width: "100%", maxWidth: "20rem" }}>
      <Combobox items={countries}>
        <ComboboxInput placeholder="Select a country" aria-label="Country" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(country: Country) => (
              <ComboboxItem key={country.value} value={country}>
                <span style={{ flex: 1 }}>{country.label}</span>
                <span
                  style={{
                    color: "var(--np-muted-foreground)",
                    fontSize: "0.75rem",
                  }}
                >
                  {country.continent}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
