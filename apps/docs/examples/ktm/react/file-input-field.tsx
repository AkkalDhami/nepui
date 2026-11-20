"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/react/field"
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

export default function FileInputField() {
  const [error, setError] = useState("")

  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="file-input-field">Proof of address</FieldLabel>
        <FileInput
          name="proof"
          required
          invalid={Boolean(error)}
          accept={["image/*", ".pdf"]}
          maxSize={5_000_000}
          onValueChange={() => setError("")}
          onReject={() =>
            setError("Only images and PDFs up to 5 MB are accepted.")
          }
        >
          <FileInputDropzone>
            <FileInputDropzoneIcon />
            <FileInputDropzoneTitle>Drop a scan here</FileInputDropzoneTitle>
            <FileInputDropzoneDescription>
              Images or PDFs, up to 5 MB.
            </FileInputDropzoneDescription>
            <FileInputTrigger
              id="file-input-field"
              aria-describedby="file-input-field-description file-input-field-error"
            >
              Choose a file
            </FileInputTrigger>
          </FileInputDropzone>
          <FileInputList aria-label="Proof of address">
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
        <FieldDescription id="file-input-field-description">
          A utility bill or bank statement from the last 3 months.
        </FieldDescription>
        {error ? (
          <FieldError id="file-input-field-error">{error}</FieldError>
        ) : null}
      </Field>
    </div>
  )
}
