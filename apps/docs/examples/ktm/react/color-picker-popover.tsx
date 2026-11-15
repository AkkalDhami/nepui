"use client"

import { Popover } from "@base-ui/react/popover"

import { Button } from "@/registry/react/button"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "@/registry/react/color-picker"

export default function ColorPickerPopoverDemo() {
  return (
    <ColorPicker
      defaultValue="#ec4899"
      aria-label="Accent color"
      style={{ width: "auto" }}
    >
      <Popover.Root>
        <Popover.Trigger
          render={
            <Button variant="outline" style={{ alignSelf: "flex-start" }} />
          }
        >
          <ColorPickerSwatch
            style={{ width: "1rem", height: "1rem", borderRadius: "9999px" }}
          />
          Accent color
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner side="bottom" align="start" sideOffset={8}>
            <Popover.Popup
              style={{
                zIndex: 50,
                width: "16rem",
                padding: "0.75rem",
                display: "grid",
                gap: "0.75rem",
                border: "1px solid var(--np-border)",
                borderRadius: "var(--np-radius-lg)",
                background: "var(--np-popover)",
                color: "var(--np-popover-foreground, var(--np-foreground))",
                boxShadow: "var(--np-shadow-md)",
              }}
            >
              <ColorPickerArea />
              <ColorPickerSlider />
              <ColorPickerInput />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </ColorPicker>
  )
}
