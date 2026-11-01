"use client"

import type { CSSProperties } from "react"

import { CaretRightIcon, FileIcon, FolderIcon } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/collapsible"
import { Button } from "@/registry/react/button"

const caret = { "--np-collapsible-icon-rotate": "90deg" } as CSSProperties

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  paddingBlockStart: "0.25rem",
  paddingInlineStart: "1.5rem",
} as const

const file = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingInlineStart: "1.5rem",
} as const

export default function CollapsibleFileTree() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        width: "100%",
        maxWidth: "16rem",
        fontSize: "0.875rem",
      }}
    >
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          render={
            <Button variant={"ghost"} size={"sm"}>
              <CaretRightIcon className="np-collapsible-icon" style={caret} />
              <FolderIcon />
              components
            </Button>
          }
        />
        <CollapsibleContent style={list}>
          <div style={file}>
            <FileIcon />
            button.tsx
          </div>
          <div style={file}>
            <FileIcon />
            card.tsx
          </div>
          <div style={file}>
            <FileIcon />
            field.tsx
          </div>
          <div style={file}>
            <FileIcon />
            input.tsx
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          render={
            <Button variant={"ghost"} size={"sm"}>
              <CaretRightIcon className="np-collapsible-icon" style={caret} />
              <FolderIcon />
              lib
            </Button>
          }
        />
        <CollapsibleContent style={list}>
          <div style={file}>
            <FileIcon />
            utils.ts
          </div>
          <div style={file}>
            <FileIcon />
            cn.ts
          </div>
          <div style={file}>
            <FileIcon />
            api.ts
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div style={{ ...file, paddingInlineStart: "1.5rem" }}>
        <FileIcon />
        app.tsx
      </div>
      <div style={{ ...file, paddingInlineStart: "1.5rem" }}>
        <FileIcon />
        layout.json
      </div>
      <div style={{ ...file, paddingInlineStart: "1.5rem" }}>
        <FileIcon />
        package.json
      </div>
    </div>
  )
}
