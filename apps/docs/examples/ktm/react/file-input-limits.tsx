"use client"

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

export default function FileInputLimits() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput multiple maxFiles={3} maxSize={2_000_000}>
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Up to 3 files</FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            Each file can be up to 2 MB.
          </FileInputDropzoneDescription>
          <FileInputTrigger>Browse files</FileInputTrigger>
        </FileInputDropzone>
        <FileInputRejections />
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
