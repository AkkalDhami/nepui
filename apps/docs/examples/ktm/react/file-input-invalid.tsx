"use client"

import { Field, FieldError, FieldLabel } from "@/registry/react/field"
import {
  FileInput,
  FileInputDropzone,
  FileInputDropzoneDescription,
  FileInputDropzoneIcon,
  FileInputDropzoneTitle,
  FileInputTrigger,
} from "@/registry/react/file-input"

export default function FileInputInvalid() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <Field data-invalid>
        <FieldLabel htmlFor="file-input-invalid">Signed contract</FieldLabel>
        <FileInput invalid required accept=".pdf">
          <FileInputDropzone>
            <FileInputDropzoneIcon />
            <FileInputDropzoneTitle>
              Drop the signed PDF here
            </FileInputDropzoneTitle>
            <FileInputDropzoneDescription>
              Only PDF files are accepted.
            </FileInputDropzoneDescription>
            <FileInputTrigger
              id="file-input-invalid"
              aria-describedby="file-input-invalid-message"
            >
              Choose a PDF
            </FileInputTrigger>
          </FileInputDropzone>
        </FileInput>
        <FieldError id="file-input-invalid-message">
          Add the signed contract to continue.
        </FieldError>
      </Field>
    </div>
  )
}
