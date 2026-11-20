"use client"

import { List, ListItem } from "@/registry/react/list"

const caption = {
  margin: "0 0 0.5rem",
  fontFamily: "var(--np-font-mono, monospace)",
  fontSize: "0.75rem",
  color: "var(--np-muted-foreground)",
}

export default function ListSelection() {
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
        <p style={caption}>single</p>
        <List
          variant="plain"
          selectionMode="single"
          defaultValue={["np"]}
          aria-label="Language"
        >
          <ListItem value="np">Nepali</ListItem>
          <ListItem value="en">English</ListItem>
          <ListItem value="ne-bh">Bhojpuri</ListItem>
          <ListItem value="mai" disabled>
            Maithili
          </ListItem>
        </List>
      </div>
      <div>
        <p style={caption}>multiple</p>
        <List
          variant="bordered"
          selectionMode="multiple"
          defaultValue={["email", "push"]}
          aria-label="Notification channels"
        >
          <ListItem value="email">Email</ListItem>
          <ListItem value="sms">SMS</ListItem>
          <ListItem value="push">Push</ListItem>
        </List>
      </div>
    </div>
  )
}
