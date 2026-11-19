"use client"

import type { CSSProperties } from "react"

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
  FileInputRejections,
  FileInputTrigger,
} from "@/registry/react/file-input"

export default function FileInputPreviews() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput
        multiple
        accept="image/*"
        style={{ "--np-file-input-preview-size": "3rem" } as CSSProperties}
      >
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Drop images here</FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            Thumbnails show as soon as they are added.
          </FileInputDropzoneDescription>
          <FileInputTrigger>Browse images</FileInputTrigger>
        </FileInputDropzone>
        <FileInputRejections />
        <FileInputList aria-label="Images">
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
