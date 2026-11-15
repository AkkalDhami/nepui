"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
  createColorPickerController,
} from "@/registry/react/color-picker"

export default function ColorPickerControlledDemo() {
  const [value, setValue] = React.useState("#0ea5e9")
  const [committed, setCommitted] = React.useState("#0ea5e9")
  const [controller] = React.useState(createColorPickerController)

  return (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <ColorPicker
        value={value}
        onValueChange={setValue}
        onValueCommit={setCommitted}
        controller={controller}
        aria-label="Color"
      >
        <ColorPickerArea />
        <ColorPickerSlider />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>
      <Button
        variant="outline"
        size="sm"
        onClick={() => controller.setValue("#663399")}
      >
        Set rebeccapurple
      </Button>
      <p
        style={{
          margin: 0,
          color: "var(--np-muted-foreground)",
          fontSize: "0.875rem",
        }}
      >
        Live: {value} · Committed: {committed}
      </p>
    </div>
  )
}
