"use client"

import { Spinner } from "@/registry/react/spinner"

export default function SpinnerColor() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Spinner color="tomato" size="lg" />
      <Spinner color="#2563eb" size="lg" />
      <Spinner color="rgb(34 197 94)" size="lg" />
      <Spinner color="#d80606ff" mutedColor="#0211b7ff" size="lg" />
    </div>
  )
}
