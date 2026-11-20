"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  FileInput,
  FileInputDropzone,
  FileInputDropzoneDescription,
  FileInputDropzoneIcon,
  FileInputDropzoneTitle,
  FileInputItem,
  FileInputItemDetails,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  FileInputTrigger,
} from "@/registry/react/file-input"

export default function FileInputControlled() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput
        multiple
        value={files}
        onValueChange={(value) => setFiles(value)}
      >
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>
            Drag and drop files here
          </FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            The files live in your state.
          </FileInputDropzoneDescription>
          <FileInputTrigger>Browse files</FileInputTrigger>
        </FileInputDropzone>
        <FileInputList aria-label="Files">
          <FileInputItem>
            <FileInputItemPreview />
            <FileInputItemDetails>
              <FileInputItemName />
              <FileInputItemSize />
            </FileInputItemDetails>
            <FileInputItemRemove />
          </FileInputItem>
        </FileInputList>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              color: "var(--np-muted-foreground)",
            }}
          >
            {files.length} {files.length === 1 ? "file" : "files"} selected
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={files.length === 0}
            onClick={() => setFiles([])}
          >
            Clear all
          </Button>
        </div>
      </FileInput>
    </div>
  )
}
