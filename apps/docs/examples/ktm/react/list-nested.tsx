"use client"

import { List, ListItem } from "@/registry/react/list"

const caption = {
  margin: "0 0 0.5rem",
  fontFamily: "var(--np-font-mono, monospace)",
  fontSize: "0.75rem",
  color: "var(--np-muted-foreground)",
}

export default function ListNested() {
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
        <p style={caption}>unordered</p>
        <List aria-label="Unordered nesting">
          <ListItem>
            Frontend
            <List>
              <ListItem>
                Components
                <List>
                  <ListItem>Button</ListItem>
                  <ListItem>Input</ListItem>
                </List>
              </ListItem>
              <ListItem>Styles</ListItem>
            </List>
          </ListItem>
          <ListItem>Backend</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>ordered</p>
        <List ordered aria-label="Ordered nesting">
          <ListItem>
            Frontend
            <List ordered>
              <ListItem>
                Components
                <List ordered>
                  <ListItem>Button</ListItem>
                  <ListItem>Input</ListItem>
                </List>
              </ListItem>
              <ListItem>Styles</ListItem>
            </List>
          </ListItem>
          <ListItem>Backend</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>outline + guides</p>
        <List ordered marker="outline" guides aria-label="Outline numbering">
          <ListItem>
            Frontend
            <List ordered>
              <ListItem>
                Components
                <List ordered>
                  <ListItem>Button</ListItem>
                  <ListItem>Input</ListItem>
                </List>
              </ListItem>
              <ListItem>Styles</ListItem>
            </List>
          </ListItem>
          <ListItem>Backend</ListItem>
        </List>
      </div>
    </div>
  )
}
