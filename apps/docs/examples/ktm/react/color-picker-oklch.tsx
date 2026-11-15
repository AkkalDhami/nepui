"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaCanvas,
  ColorPickerAreaThumb,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "@/registry/react/color-picker"

export default function ColorPickerOklchDemo() {
  return (
    <ColorPicker
      space="oklch"
      defaultValue="oklch(0.65 0.2 250)"
      aria-label="OKLCH color"
    >
      <ColorPickerArea>
        <ColorPickerAreaCanvas />
        <ColorPickerAreaThumb />
      </ColorPickerArea>
      <ColorPickerSlider channel="hue" />
      <ColorPickerSlider channel="alpha" />
      <div className="np-color-picker-row">
        <ColorPickerSwatch />
        <ColorPickerInput />
      </div>
    </ColorPicker>
  )
}
