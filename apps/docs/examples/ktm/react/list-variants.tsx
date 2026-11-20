"use client"

import { List, ListItem } from "@/registry/react/list"

const caption = {
  margin: "0 0 0.5rem",
  fontFamily: "var(--font-mono, monospace)",
  fontSize: "0.75rem",
  color: "var(--np-muted-foreground)",
}

export default function ListVariants() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <div>
        <p style={caption}>plain</p>
        <List variant="plain" aria-label="Plain">
          <ListItem>Profile</ListItem>
          <ListItem>Billing</ListItem>
          <ListItem>Security</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>divided</p>
        <List variant="divided" aria-label="Divided">
          <ListItem>Profile</ListItem>
          <ListItem>Billing</ListItem>
          <ListItem>Security</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>bordered</p>
        <List variant="bordered" aria-label="Bordered">
          <ListItem>Profile</ListItem>
          <ListItem>Billing</ListItem>
          <ListItem>Security</ListItem>
        </List>
      </div>
    </div>
  )
}
