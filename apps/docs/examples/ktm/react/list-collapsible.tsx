"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import { List, ListItem } from "@/registry/react/list"

export default function ListCollapsible() {
  const [open, setOpen] = useState({ src: true, docs: false, tests: false })

  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        width: "100%",
        maxWidth: "20rem",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen({ src: true, docs: true, tests: true })}
        >
          Expand all
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen({ src: false, docs: false, tests: false })}
        >
          Collapse all
        </Button>
      </div>
      <List
        variant="plain"
        guides
        collapsible
        navigation
        aria-label="Project files"
      >
        <ListItem
          expanded={open.src}
          onExpandedChange={(expanded) =>
            setOpen((state) => ({ ...state, src: expanded }))
          }
        >
          src
          <List>
            <ListItem>components</ListItem>
            <ListItem>styles</ListItem>
            <ListItem>index.ts</ListItem>
          </List>
        </ListItem>
        <ListItem
          expanded={open.docs}
          onExpandedChange={(expanded) =>
            setOpen((state) => ({ ...state, docs: expanded }))
          }
        >
          docs
          <List>
            <ListItem>getting-started.mdx</ListItem>
            <ListItem>theming.mdx</ListItem>
          </List>
        </ListItem>
        <ListItem
          expanded={open.tests}
          onExpandedChange={(expanded) =>
            setOpen((state) => ({ ...state, tests: expanded }))
          }
        >
          tests
          <List>
            <ListItem>list.test.ts</ListItem>
            <ListItem>button.test.ts</ListItem>
          </List>
        </ListItem>
        <ListItem>package.json</ListItem>
      </List>
    </div>
  )
}
