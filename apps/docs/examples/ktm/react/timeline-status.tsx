"use client"

import * as React from "react"

import { Button } from "@/registry/react/button"
import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
  createTimelineController,
} from "@/registry/react/timeline"

const steps = [
  {
    value: "placed",
    title: "Order placed",
    description: "We have your order.",
  },
  { value: "packed", title: "Packed", description: "Your items are boxed." },
  {
    value: "shipped",
    title: "Shipped, in progress",
    description: "On the way to your address.",
  },
  {
    value: "delivered",
    title: "Delivered",
    description: "Expected on Friday.",
  },
]

export default function TimelineStatusDemo() {
  const [controller] = React.useState(createTimelineController)

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        justifyItems: "start",
        width: "100%",
        maxWidth: "24rem",
      }}
    >
      <Timeline aria-label="Order progress" value={2} controller={controller}>
        {steps.map((step, index) => (
          <TimelineItem key={step.value} value={step.value} step={index + 1}>
            <TimelineMarker>
              {index < 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : null}
            </TimelineMarker>
            <TimelineConnector />
            <TimelineTitle>{step.title}</TimelineTitle>
            <TimelineDescription>{step.description}</TimelineDescription>
          </TimelineItem>
        ))}
      </Timeline>
      <Button
        variant="outline"
        size="sm"
        onClick={() => controller.focus("shipped")}
      >
        Focus the current step
      </Button>
    </div>
  )
}
