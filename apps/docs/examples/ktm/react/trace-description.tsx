"use client"

import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/react/trace"

export default function TraceDescriptionDemo() {
  return (
    <Trace style={{ width: "100%", maxWidth: "28rem" }}>
      <TraceLine>
        <TraceIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        </TraceIcon>
        <TraceTitle>Read</TraceTitle>
        <TraceDescription>src/components/trace.tsx</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </TraceIcon>
        <TraceTitle>Searched</TraceTitle>
        <TraceDescription>for cache keys in the docs</TraceDescription>
      </TraceLine>
    </Trace>
  )
}
