"use client"

import { List, ListItem } from "@/registry/react/list"

const caption = {
  margin: "0 0 0.5rem",
  fontFamily: "var(--np-font-mono, monospace)",
  fontSize: "0.75rem",
  color: "var(--np-muted-foreground)",
}

export default function ListMarkers() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <div>
        <p style={caption}>disc</p>
        <List marker="disc" aria-label="Disc markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>circle</p>
        <List marker="circle" aria-label="Circle markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>square</p>
        <List marker="square" aria-label="Square markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>dash</p>
        <List marker="dash" aria-label="Dash markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>check</p>
        <List marker="check" aria-label="Check markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>arrow</p>
        <List marker="arrow" aria-label="Arrow markers">
          <ListItem>Dal</ListItem>
          <ListItem>Bhat</ListItem>
          <ListItem>Tarkari</ListItem>
        </List>
      </div>
    </div>
  )
}
