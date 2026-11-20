"use client"

import {
  ArchiveIcon,
  PencilSimpleIcon,
  ShareIcon,
  TrashIcon,
} from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/react/context-menu"

export default function ContextMenuDestructive() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "18.75rem",
          height: "9.375rem",
          border: "1px dashed var(--np-border)",
          borderRadius: "var(--np-radius-xl)",
          fontSize: "0.875rem",
        }}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <PencilSimpleIcon />
          Edit
        </ContextMenuItem>
        <ContextMenuItem>
          <ShareIcon />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ArchiveIcon />
          Archive
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
