"use client"

import { useState } from "react"

import { Button } from "@/registry/react/button"
import { FieldDescription } from "@/registry/react/field"
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

export default function FileInputForm() {
  const [message, setMessage] = useState("Nothing sent yet.")
  const [initial] = useState(() => [
    new File(["Dear hiring team"], "cover-letter.txt", { type: "text/plain" }),
  ])

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "28rem",
      }}
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const names: string[] = []
        for (const file of data.getAll("attachments") as File[]) {
          if (file.name !== "") names.push(file.name)
        }
        setMessage(
          names.length ? `Sent ${names.join(", ")}.` : "No files attached."
        )
      }}
      onReset={() => setMessage("Form reset.")}
    >
      <FileInput name="attachments" multiple defaultValue={initial}>
        <FileInputDropzone>
          <FileInputDropzoneIcon />
          <FileInputDropzoneTitle>Attach files</FileInputDropzoneTitle>
          <FileInputDropzoneDescription>
            They are sent with the form.
          </FileInputDropzoneDescription>
          <FileInputTrigger>Browse files</FileInputTrigger>
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
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit">Send</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </div>
      <FieldDescription>{message}</FieldDescription>
    </form>
  )
}
