"use client"

import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/registry/react/trace"

export default function TraceLinkDemo() {
  return (
    <Trace style={{ width: "100%", maxWidth: "28rem" }}>
      <a
        href="https://docs.astro.build"
        target="_blank"
        rel="noreferrer"
        className="np-trace-link"
      >
        <TraceLine>
          <TraceTitle>
            Install Astro
            <span className="np-trace-sr-only"> (opens in a new tab)</span>
          </TraceTitle>
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
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </TraceIcon>
        </TraceLine>
      </a>
      <a
        href="https://vite.dev"
        target="_blank"
        rel="noreferrer"
        className="np-trace-link"
      >
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
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </TraceIcon>
          <TraceTitle>
            Vite documentation
            <span className="np-trace-sr-only"> (opens in a new tab)</span>
          </TraceTitle>
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
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </TraceIcon>
        </TraceLine>
      </a>
      <button
        type="button"
        className="np-trace-link"
        onClick={() => alert("Opened")}
      >
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
          <TraceTitle>Open the changelog</TraceTitle>
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </TraceIcon>
        </TraceLine>
      </button>
    </Trace>
  )
}
