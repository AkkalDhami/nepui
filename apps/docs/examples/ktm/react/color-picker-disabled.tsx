"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "@/registry/react/color-picker"

export default function ColorPickerDisabledDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      <ColorPicker disabled defaultValue="#22c55e" aria-label="Disabled color">
        <ColorPickerArea />
        <ColorPickerSlider />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>

      <ColorPicker readOnly defaultValue="#f97316" aria-label="Read-only color">
        <ColorPickerArea />
        <ColorPickerSlider />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>
    </div>
  )
}
