"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/react/context-menu"

export default function ContextMenuSides() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.75rem",
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "9rem",
            height: "5rem",
            border: "1px dashed var(--np-border)",
            borderRadius: "var(--np-radius-xl)",
            fontSize: "0.875rem",
          }}
        >
          Right click (top)
        </ContextMenuTrigger>
        <ContextMenuContent side="top">
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Team</ContextMenuItem>
              <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "9rem",
            height: "5rem",
            border: "1px dashed var(--np-border)",
            borderRadius: "var(--np-radius-xl)",
            fontSize: "0.875rem",
          }}
        >
          Right click (right)
        </ContextMenuTrigger>
        <ContextMenuContent side="right">
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Team</ContextMenuItem>
              <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "9rem",
            height: "5rem",
            border: "1px dashed var(--np-border)",
            borderRadius: "var(--np-radius-xl)",
            fontSize: "0.875rem",
          }}
        >
          Right click (bottom)
        </ContextMenuTrigger>
        <ContextMenuContent side="bottom">
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Team</ContextMenuItem>
              <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "9rem",
            height: "5rem",
            border: "1px dashed var(--np-border)",
            borderRadius: "var(--np-radius-xl)",
            fontSize: "0.875rem",
          }}
        >
          Right click (left)
        </ContextMenuTrigger>
        <ContextMenuContent side="left">
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Team</ContextMenuItem>
              <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
