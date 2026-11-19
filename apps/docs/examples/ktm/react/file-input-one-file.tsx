"use client"

import {
  FileInput,
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

export default function FileInputOneFile() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput accept=".pdf">
        {({ value }) => (
          <>
            <FileInputTrigger>
              {value.length ? "Replace PDF" : "Choose a PDF"}
            </FileInputTrigger>
            <FileInputRejections />
            <FileInputList aria-label="PDF">
              <FileInputItem>
                <FileInputItemPreview />
                <FileInputItemDetails>
                  <FileInputItemName />
                  <FileInputItemSize />
                </FileInputItemDetails>
                <FileInputItemRemove />
              </FileInputItem>
            </FileInputList>
          </>
        )}
      </FileInput>
    </div>
  )
}
