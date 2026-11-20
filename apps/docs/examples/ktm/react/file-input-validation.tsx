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
  FileInputRejections,
  FileInputTrigger,
  createFileInputController,
} from "@/registry/react/file-input"

export default function FileInputValidation() {
  const [files] = useState(createFileInputController)

  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput
        multiple
        controller={files}
        validate={(file) =>
          files.getValue().some((other) => other.name === file.name)
            ? "duplicate"
            : null
        }
      >
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Add files once</FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            A file with the same name is left out.
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
