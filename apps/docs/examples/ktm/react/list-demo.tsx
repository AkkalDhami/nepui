"use client"

import { List, ListItem } from "@/registry/react/list"

export default function ListDemo() {
  return (
    <List
      aria-label="Launch checklist"
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <ListItem>Write the release notes</ListItem>
      <ListItem>Tag the version in Git</ListItem>
      <ListItem>Publish the package</ListItem>
      <ListItem>Announce it to the community</ListItem>
    </List>
  )
}
