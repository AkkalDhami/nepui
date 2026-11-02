"use client"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/react/item"

const tiles = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%23a1a1aa'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%2394a3b8'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'><rect width='4' height='4' fill='%2386efac'/><circle cx='2' cy='2' r='1' fill='%23fafafa' fill-opacity='.7'/></svg>",
]

export default function ItemImage() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <div className="np-item-group">
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="image">
            <img alt="" src={tiles[0]} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Midnight City Lights</ItemTitle>
            <ItemDescription>Electric Nights - Neon Dreams</ItemDescription>
          </ItemContent>
          <ItemContent style={{ flex: "none", textAlign: "end" }}>
            <ItemDescription>3:45</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="image">
            <img alt="" src={tiles[1]} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Coffee Shop Conversations</ItemTitle>
            <ItemDescription>Urban Stories - The Morning Brew</ItemDescription>
          </ItemContent>
          <ItemContent style={{ flex: "none", textAlign: "end" }}>
            <ItemDescription>4:05</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="image">
            <img alt="" src={tiles[2]} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Digital Rain</ItemTitle>
            <ItemDescription>Binary Beats - Cyber Symphony</ItemDescription>
          </ItemContent>
          <ItemContent style={{ flex: "none", textAlign: "end" }}>
            <ItemDescription>3:30</ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}
