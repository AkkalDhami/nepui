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
  FileInputTrigger,
  relativePath,
} from "@/registry/react/file-input"

export default function FileInputFolder() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput directory>
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Drop a folder here</FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            Every file inside it is added.
          </FileInputDropzoneDescription>
          <FileInputTrigger>Choose a folder</FileInputTrigger>
        </FileInputDropzone>
        <FileInputList aria-label="Files">
          <FileInputItem>
            {({ file }) => (
              <>
                <FileInputItemPreview />
                <FileInputItemDetails>
                  <FileInputItemName>{relativePath(file)}</FileInputItemName>
                  <FileInputItemSize />
                </FileInputItemDetails>
                <FileInputItemRemove />
              </>
            )}
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </div>
  )
}
