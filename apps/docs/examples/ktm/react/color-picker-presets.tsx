"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerSlider,
  ColorPickerSwatch,
  ColorPickerSwatchItem,
  ColorPickerSwatches,
} from "@/registry/react/color-picker"

const presets = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
]

export default function ColorPickerPresetsDemo() {
  return (
    <ColorPicker space="srgb" defaultValue="rgb(59 130 246)" aria-label="Color">
      <ColorPickerArea />
      <ColorPickerSlider />
      <div className="np-color-picker-row">
        <ColorPickerSwatch />
        <ColorPickerChannelInput channel="red" />
        <ColorPickerChannelInput channel="green" />
        <ColorPickerChannelInput channel="blue" />
      </div>
      <ColorPickerSwatches>
        {presets.map((color) => (
          <ColorPickerSwatchItem key={color} value={color} />
        ))}
      </ColorPickerSwatches>
    </ColorPicker>
  )
}
