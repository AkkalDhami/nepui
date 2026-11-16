import { siteConfig } from "@/lib/seo"
import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = clip(searchParams.get("title") ?? siteConfig.tagline, 80)
  const description = clip(
    searchParams.get("description") ?? siteConfig.description,
    140
  )

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            background: "#12b417",
          }}
        />
        {siteConfig.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.4, color: "#a1a1aa" }}>
          {description}
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#737373" }}>
        {new URL(siteConfig.url).host}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      },
    }
  )
}
