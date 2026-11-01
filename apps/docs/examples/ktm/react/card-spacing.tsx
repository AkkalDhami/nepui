"use client"

import type { CSSProperties } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"

export default function CardSpacing() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>16px spacing</CardTitle>
          <CardDescription>The default spacing.</CardDescription>
        </CardHeader>
        <CardContent>Sections and insets share one value.</CardContent>
      </Card>
      <Card
        style={
          {
            "--np-card-spacing": "calc(var(--np-spacing) * 6)",
          } as CSSProperties
        }
      >
        <CardHeader>
          <CardTitle>24px spacing</CardTitle>
          <CardDescription>Set on the card.</CardDescription>
        </CardHeader>
        <CardContent>Sections and insets share one value.</CardContent>
      </Card>
      <Card
        style={
          {
            "--np-card-spacing": "calc(var(--np-spacing) * 8)",
          } as CSSProperties
        }
      >
        <CardHeader>
          <CardTitle>32px spacing</CardTitle>
          <CardDescription>Set on the card.</CardDescription>
        </CardHeader>
        <CardContent>Sections and insets share one value.</CardContent>
      </Card>
    </div>
  )
}
