"use client"

import { FileInput, FileInputTrigger } from "@/registry/react/file-input"

export default function FileInputUploadButton() {
  return (
    <FileInput name="resume">
      {(state) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <FileInputTrigger>Upload resume</FileInputTrigger>
          <span
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.875rem",
              color: "var(--np-muted-foreground)",
            }}
          >
            {state.value[0]?.name ?? "No file chosen"}
          </span>
        </div>
      )}
    </FileInput>
  )
}
