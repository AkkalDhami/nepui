"use client"

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/react/meter"

export default function MeterFormatted() {
  return (
    <Meter max={5} value={3} style={{ width: "100%", maxWidth: "20rem" }}>
      <MeterLabel>Rating</MeterLabel>
      <MeterValue>{(_formatted, value) => `${value} / 5`}</MeterValue>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
