"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "@/registry/react/color-picker"

export default function ColorPickerSpacesDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      <ColorPicker
        space="hsl"
        defaultValue="hsl(262 80% 55%)"
        aria-label="HSL color"
        style={{ width: "14rem" }}
      >
        <ColorPickerArea />
        <ColorPickerSlider channel="hue" />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>

      <ColorPicker
        space="hsl"
        defaultValue="hsl(150 70% 45%)"
        aria-label="Hue and lightness"
        style={{ width: "14rem" }}
      >
        <ColorPickerArea x="hue" y="lightness" />
        <ColorPickerSlider channel="saturation" />
        <div className="np-color-picker-row">
          <ColorPickerSwatch />
          <ColorPickerInput />
        </div>
      </ColorPicker>

      <ColorPicker
        space="hsl"
        defaultValue="hsl(30 90% 55%)"
        aria-label="Vertical saturation"
        style={{ width: "auto" }}
      >
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <ColorPickerArea style={{ width: "10rem" }} />
          <ColorPickerSlider channel="saturation" orientation="vertical" />
        </div>
        <ColorPickerSlider channel="hue" />
      </ColorPicker>
    </div>
  )
}
