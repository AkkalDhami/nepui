"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
  ColorPickerSwatchItem,
  ColorPickerSwatches,
  type ColorFormat,
} from "@/registry/react/color-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/select"

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

const formats = [
  { label: "HEX", value: "hex" },
  { label: "RGB", value: "rgb" },
  { label: "HSL", value: "hsl" },
  { label: "OKLCH", value: "oklch" },
]

export default function ColorPickerDemo() {
  const [format, setFormat] = React.useState<ColorFormat>("hex")

  return (
    <ColorPicker
      defaultValue="#0ea5e9"
      format={format}
      aria-label="Brand color"
    >
      <Select
        items={formats}
        onValueChange={(event) => setFormat(event?.toString() as ColorFormat)}
      >
        <SelectTrigger style={{ width: "100%" }}>
          <SelectValue placeholder="Select a format" />
        </SelectTrigger>
        <SelectContent>
          {formats.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ColorPickerArea />
      <div className="np-color-picker-row">
        <ColorPickerSlider channel="hue" />
        <ColorPickerEyeDropper />
      </div>
      <ColorPickerSlider channel="alpha" />
      <div className="np-color-picker-row">
        <ColorPickerSwatch />
        <ColorPickerInput />
      </div>
      <ColorPickerSwatches>
        {presets.map((color) => (
          <ColorPickerSwatchItem key={color} value={color} />
        ))}
      </ColorPickerSwatches>
    </ColorPicker>
  )
}
