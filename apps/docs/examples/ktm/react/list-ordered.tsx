"use client"

import { List, ListItem } from "@/registry/react/list"

const caption = {
  margin: "0 0 0.5rem",
  fontFamily: "var(--np-font-mono, monospace)",
  fontSize: "0.75rem",
  color: "var(--np-muted-foreground)",
}

export default function ListOrdered() {
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
        <p style={caption}>decimal</p>
        <List ordered marker="decimal" aria-label="Decimal">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>decimal-leading-zero</p>
        <List
          ordered
          marker="decimal-leading-zero"
          aria-label="Decimal with leading zero"
        >
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>lower-alpha</p>
        <List ordered marker="lower-alpha" aria-label="Lower alpha">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>upper-alpha</p>
        <List ordered marker="upper-alpha" aria-label="Upper alpha">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>lower-roman</p>
        <List ordered marker="lower-roman" aria-label="Lower roman">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>upper-roman</p>
        <List ordered marker="upper-roman" aria-label="Upper roman">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>lower-greek</p>
        <List ordered marker="lower-greek" aria-label="Lower greek">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>start=5</p>
        <List ordered start={5} aria-label="Starting at five">
          <ListItem>Plan</ListItem>
          <ListItem>Build</ListItem>
          <ListItem>Ship</ListItem>
        </List>
      </div>
    </div>
  )
}
