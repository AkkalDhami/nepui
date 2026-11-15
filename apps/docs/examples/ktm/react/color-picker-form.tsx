"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "@/registry/react/color-picker"
import { Button } from "@/registry/react/button"

export default function ColorPickerFormDemo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        alert(`brand = ${data.get("brand")}`)
      }}
      style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}
    >
      <ColorPicker name="brand" defaultValue="#8b5cf6" aria-label="Brand color">
        <ColorPickerArea />
        <ColorPickerSlider />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit" size="sm">
          Save
        </Button>
        <Button type="reset" variant="outline" size="sm">
          Reset
        </Button>
      </div>
    </form>
  )
}
