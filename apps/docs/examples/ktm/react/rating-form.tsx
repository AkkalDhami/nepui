"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import { Rating } from "@/registry/react/rating"

export default function RatingFormDemo() {
  const [submitted, setSubmitted] = React.useState("")

  return (
    <form
      style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(`rating = ${data.get("rating")}`)
      }}
      onReset={() => setSubmitted("")}
    >
      <span
        id="rating-form-label"
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        How was your experience?
      </span>
      <Rating
        name="rating"
        aria-labelledby="rating-form-label"
        defaultValue={null}
        step={0.5}
        required
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit" size="sm">
          Submit
        </Button>
        <Button type="reset" variant="outline" size="sm">
          Reset
        </Button>
      </div>
      <p
        role="status"
        style={{
          margin: 0,
          color: "var(--np-muted-foreground)",
          fontSize: "0.875rem",
        }}
      >
        {submitted}
      </p>
    </form>
  )
}
