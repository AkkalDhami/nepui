"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import {
  FileInput,
  FileInputItem,
  FileInputItemDetails,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  createFileInputController,
} from "@/registry/react/file-input"

export default function FileInputController() {
  const [controller] = useState(createFileInputController)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => controller.open()}
        >
          Choose files
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            controller.addFiles([
              new File(["Hello from the controller."], "hello.txt", {
                type: "text/plain",
              }),
            ])
          }
        >
          Add sample file
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => controller.clear()}
        >
          Clear
        </Button>
      </div>
      <FileInput multiple controller={controller}>
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
