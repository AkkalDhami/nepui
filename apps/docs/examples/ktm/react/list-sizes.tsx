"use client"

import { List, ListItem } from "@/registry/react/list"

export default function ListSizes() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      <List size="sm" aria-label="Small">
        <ListItem>Small item</ListItem>
        <ListItem>Small item</ListItem>
      </List>
      <List aria-label="Default">
        <ListItem>Default item</ListItem>
        <ListItem>Default item</ListItem>
      </List>
      <List size="lg" aria-label="Large">
        <ListItem>Large item</ListItem>
        <ListItem>Large item</ListItem>
      </List>
    </div>
  )
}
