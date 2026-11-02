"use client"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/registry/react/item"

const tiles = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%23a1a1aa'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%2394a3b8'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%2386efac'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
]

const image = {
  width: "100%",
  aspectRatio: "1",
  borderRadius: "var(--np-radius-sm)",
  objectFit: "cover",
} as const

export default function ItemHeaderDemo() {
  return (
    <ItemGroup
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        width: "100%",
        maxWidth: "36rem",
        gap: "1rem",
      }}
    >
      <Item variant="outline">
        <ItemHeader>
          <img alt="v0-1.5-sm" src={tiles[0]} style={image} />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>v0-1.5-sm</ItemTitle>
          <ItemDescription>Everyday tasks and UI generation.</ItemDescription>
        </ItemContent>
        <ItemFooter>Fast</ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <img alt="v0-1.5-lg" src={tiles[1]} style={image} />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>v0-1.5-lg</ItemTitle>
          <ItemDescription>Advanced thinking or reasoning.</ItemDescription>
        </ItemContent>
        <ItemFooter>Thorough</ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <img alt="v0-2.0-mini" src={tiles[2]} style={image} />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>v0-2.0-mini</ItemTitle>
          <ItemDescription>Open Source model for everyone.</ItemDescription>
        </ItemContent>
        <ItemFooter>Open</ItemFooter>
      </Item>
    </ItemGroup>
  )
}
