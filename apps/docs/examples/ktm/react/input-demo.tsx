"use client"

import { Input } from "@/registry/react/input"
import { Label } from "@/registry/react/label"

export default function InputDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "340px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
        }}
      >
        <Label htmlFor="name">
          Enter your name
          <span style={{ color: "var(--np-destructive)" }}>*</span>
        </Label>
        <Input id="name" name="name" placeholder="Enter your name" size="sm" />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
        }}
      >
        <Label htmlFor="email">
          Enter your email
          <span style={{ color: "var(--np-destructive)" }}>*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.625rem",
          flexDirection: "column",
        }}
      >
        <Label htmlFor="password">
          Enter your password
          <span style={{ color: "var(--np-destructive)" }}>*</span>
        </Label>
        <Input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          size="lg"
        />
      </div>
    </div>
  )
}
