"use client"

import { CaretDownIcon } from "@phosphor-icons/react"

import { Button } from "@/registry/react/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/collapsible"

export default function CollapsibleBasic() {
  return (
    <Collapsible
      style={{
        width: "100%",
        maxWidth: "22rem",
        height: "max-content",
      }}
    >
      <CollapsibleTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
          />
        }
      >
        Product details
        <CaretDownIcon className="np-collapsible-icon" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p
          style={{
            margin: 0,
            paddingTop: "0.75rem",
            fontSize: "0.875rem",
            color: "var(--np-muted-foreground)",
          }}
        >
          This product has a lightweight aluminum frame, a 14-hour battery and a
          two-year warranty. It ships in recyclable packaging.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}
