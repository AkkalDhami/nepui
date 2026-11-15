"use client"

import { List, ListItem } from "@/registry/react/list"

export default function ListHorizontal() {
  return (
    <List orientation="horizontal" navigation aria-label="Footer links">
      <ListItem>
        <a href="#docs" style={{ color: "inherit" }}>
          Docs
        </a>
      </ListItem>
      <ListItem>
        <a href="#components" style={{ color: "inherit" }}>
          Components
        </a>
      </ListItem>
      <ListItem>
        <a href="#changelog" style={{ color: "inherit" }}>
          Changelog
        </a>
      </ListItem>
      <ListItem>
        <a href="#github" style={{ color: "inherit" }}>
          GitHub
        </a>
      </ListItem>
    </List>
  )
}
