"use client"

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/react/meter"

export default function MeterDemo() {
  return (
    <Meter value={75} style={{ width: "100%", maxWidth: "20rem" }}>
      <MeterLabel>Storage usage</MeterLabel>
      <MeterValue />
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
