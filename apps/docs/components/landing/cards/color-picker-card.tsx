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
import { Card, CardContent } from "@/registry/react/card"

const presets = [
  "#0a0a0a",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#17062e",
]

const formats = [
  { label: "HEX", value: "hex" },
  { label: "RGB", value: "rgb" },
  { label: "HSL", value: "hsl" },
  { label: "OKLCH", value: "oklch" },
]

export function ColorPickerCard() {
  const [format, setFormat] = React.useState<ColorFormat>("hex")
  const [color, setColor] = React.useState<string>("#0a0a0a")
  return (
    <Card
      style={{
        background: color,
        filter: "grayscale(100%)",
      }}
    >
      <CardContent>
        <ColorPicker
          defaultValue="#0ea5e9"
          format={format}
          aria-label="Brand color"
          style={{
            width: "100%",
          }}
          onValueChange={(value) => setColor(value)}
        >
          <Select
            items={formats}
            onValueChange={(event) =>
              setFormat(event?.toString() as ColorFormat)
            }
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
      </CardContent>
    </Card>
  )
}
