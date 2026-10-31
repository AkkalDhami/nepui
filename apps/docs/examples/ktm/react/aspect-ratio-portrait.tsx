"use client"

import { AspectRatio } from "@/registry/react/aspect-ratio"

const src =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'><rect width='4' height='3' fill='%23a1a1aa'/><circle cx='3' cy='1' r='.5' fill='%23fafafa'/><path d='M0 3L1.3 1.5 2.2 2.4 2.9 1.8 4 3Z' fill='%2352525b'/></svg>"

export default function AspectRatioPortrait() {
  return (
    <div style={{ width: "100%", maxWidth: "10rem" }}>
      <AspectRatio ratio={9 / 16}>
        <img
          alt="Landscape illustration"
          src={src}
          style={{ borderRadius: "var(--np-radius-md)" }}
        />
      </AspectRatio>
    </div>
  )
}
