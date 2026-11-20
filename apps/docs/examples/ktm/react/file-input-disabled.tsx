"use client"

import { useState } from "react"

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

export default function FileInputDisabled() {
  const [initial] = useState(() => [
    new File(["Quarterly numbers"], "report.txt", { type: "text/plain" }),
  ])

  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput multiple disabled defaultValue={initial}>
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>
            Uploads are turned off
          </FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            Ask an administrator to enable them.
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
      </FileInput>
    </div>
  )
}
