"use client"

import {
  FileInput,
  FileInputDropzone,
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

export default function FileInputPageWide() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput multiple>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--np-muted-foreground)",
            }}
          >
            Drop files anywhere on this page.
          </p>
          <FileInputTrigger>Upload files</FileInputTrigger>
        </div>
        <FileInputDropzone target="document" data-variant="overlay">
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Drop to attach</FileInputDropzoneTitle>
        </FileInputDropzone>
        <FileInputList aria-label="Attachments">
          <FileInputItem>
            <FileInputItemPreview />
            <FileInputItemDetails>
              <FileInputItemName />
              <FileInputItemSize />
            </FileInputItemDetails>
            <FileInputItemRemove />
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </div>
  )
}
