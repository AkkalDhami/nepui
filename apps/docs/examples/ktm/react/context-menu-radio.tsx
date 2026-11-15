"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "@/registry/react/context-menu"

export default function ContextMenuRadio() {
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
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup defaultValue="pedro">
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
            <ContextMenuRadioItem value="marc">Marc Meyer</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
