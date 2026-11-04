"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/hover-card"

export default function HoverCardInline() {
  return (
    <p style={{ maxWidth: "28rem", margin: 0, lineHeight: 1.75 }}>
      Build your app with{" "}
      <HoverCard>
        <HoverCardTrigger
          href="#"
          style={{
            fontWeight: 500,
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          Next.js
        </HoverCardTrigger>
        <HoverCardContent>
          <p style={{ margin: 0 }}>
            The React framework for production, with routing, rendering and data
            fetching built in.
          </p>
        </HoverCardContent>
      </HoverCard>{" "}
      and style it with plain CSS. The link keeps working for everyone, and the
      card is only a preview for people who hover or focus it.
    </p>
  )
}
