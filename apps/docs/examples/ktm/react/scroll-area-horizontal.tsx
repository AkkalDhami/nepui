"use client"

import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/registry/react/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea
      style={{
        width: "100%",
        maxWidth: "24rem",
        whiteSpace: "nowrap",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-md)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {works.map((artwork) => (
          <figure key={artwork.artist} style={{ margin: 0, flexShrink: 0 }}>
            <div
              style={{
                overflow: "hidden",
                borderRadius: "var(--np-radius-md)",
              }}
            >
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                style={{
                  aspectRatio: "3/4",
                  height: "fit-content",
                  width: "fit-content",
                  objectFit: "cover",
                }}
                width={300}
                height={400}
              />
            </div>
            <figcaption
              style={{
                paddingTop: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--np-muted-foreground)",
              }}
            >
              Photo by{" "}
              <span style={{ fontWeight: 600, color: "var(--np-foreground)" }}>
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
