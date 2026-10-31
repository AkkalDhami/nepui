"use client"

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/react/meter"

export default function MeterRange() {
  return (
    <Meter
      min={500}
      max={1000}
      value={700}
      style={{ width: "100%", maxWidth: "20rem" }}
    >
      <MeterLabel>Bandwidth (Mbps)</MeterLabel>
      <MeterValue>{(_formatted, value) => value}</MeterValue>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
