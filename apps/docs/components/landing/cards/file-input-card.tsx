"use client"

import { useState } from "react"

import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/react/attachment"
import { Button } from "@/registry/react/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/react/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/card"
import {
  FileInput,
  FileInputDropzone,
  FileInputDropzoneDescription,
  FileInputDropzoneIcon,
  FileInputDropzoneTitle,
  FileInputItem,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  FileInputTrigger,
} from "@/registry/react/file-input"
import { toast } from "@/registry/react/toast"

type UploadStatus = {
  state: "idle" | "uploading" | "error" | "done"
  progress?: number
}

function wait(duration: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, duration))
}

export function FileInputCard() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadStatuses, setUploadStatuses] = useState(
    () => new Map<File, UploadStatus>()
  )
  const [uploadError, setUploadError] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  function updateStatuses(nextFiles: File[], status: UploadStatus) {
    setUploadStatuses((current) => {
      const next = new Map(current)
      nextFiles.forEach((file) => next.set(file, status))
      return next
    })
  }

  function handleUpload(simulateError = false) {
    if (!files.length || isUploading) return

    setUploadError("")
    setIsUploading(true)
    updateStatuses(files, { state: "uploading", progress: 10 })

    const task = (async () => {
      await wait(500)
      updateStatuses(files, { state: "uploading", progress: 65 })
      await wait(700)

      if (simulateError) {
        throw new Error(
          "The upload failed. Try again or choose different files."
        )
      }

      updateStatuses(files, { state: "done", progress: 100 })
      return files.length
    })()
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : "The upload failed. Please try again."
        setUploadError(message)
        updateStatuses(files, { state: "error" })
        throw error
      })
      .finally(() => setIsUploading(false))

    toast.promise(task, {
      loading: `Uploading ${files.length} file${files.length === 1 ? "" : "s"}...`,
      success: (count) =>
        `${count} ${count === 1 ? "file" : "files"} uploaded successfully.`,
      error: "Upload failed. Please try again.",
    })
  }

  return (
    <Card style={{ width: "100%", maxWidth: "28rem" }}>
      <CardHeader>
        <CardTitle>File uploads</CardTitle>
        <CardDescription>
          Select files to preview upload progress and feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field data-invalid={uploadError ? true : undefined}>
          <FieldLabel htmlFor="file-input-upload">Files</FieldLabel>
          <FileInput
            multiple
            maxSize={10_000_000}
            disabled={isUploading}
            invalid={Boolean(uploadError)}
            onValueChange={(nextFiles) => {
              setFiles(nextFiles)
              setUploadError("")
              setUploadStatuses((current) => {
                const retained = [...current].filter(([file]) =>
                  nextFiles.includes(file)
                )
                return new Map(retained)
              })
            }}
          >
            <FileInputDropzone>
              <FileInputDropzoneIcon />
              <FileInputDropzoneTitle>
                Drag and drop files here
              </FileInputDropzoneTitle>
              <FileInputDropzoneDescription>
                Or browse for files. Up to 10 MB each.
              </FileInputDropzoneDescription>
              <FileInputTrigger
                id="file-input-upload"
                aria-describedby={
                  uploadError
                    ? "file-input-upload-description file-input-upload-error"
                    : "file-input-upload-description"
                }
              >
                Browse files
              </FileInputTrigger>
            </FileInputDropzone>
            <FileInputList aria-label="Selected files">
              <FileInputItem
                style={{ padding: 0, border: 0, background: "transparent" }}
              >
                {({ file }) => {
                  const status: UploadStatus = uploadStatuses.get(file) ?? {
                    state: "idle",
                  }
                  const description =
                    status.state === "uploading"
                      ? `Uploading ${status.progress ?? 0}%`
                      : status.state === "error"
                        ? "Upload failed"
                        : "Uploaded successfully"

                  return (
                    <Attachment
                      state={status.state}
                      progress={status.progress}
                      style={{ width: "100%" }}
                    >
                      <AttachmentMedia>
                        <FileInputItemPreview
                          style={{ width: "100%", height: "100%" }}
                        />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>
                          <FileInputItemName />
                        </AttachmentTitle>
                        <AttachmentDescription>
                          {status.state === "idle" ? (
                            <FileInputItemSize />
                          ) : (
                            description
                          )}
                        </AttachmentDescription>
                      </AttachmentContent>
                      <AttachmentActions>
                        <FileInputItemRemove />
                      </AttachmentActions>
                    </Attachment>
                  )
                }}
              </FileInputItem>
            </FileInputList>
          </FileInput>
          <FieldDescription id="file-input-upload-description">
            Select files to see their upload status and progress.
          </FieldDescription>
          <FieldError id="file-input-upload-error">
            {uploadError || undefined}
          </FieldError>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Button
              type="button"
              disabled={!files.length || isUploading}
              onClick={() => handleUpload()}
            >
              Upload files
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!files.length || isUploading}
              onClick={() => handleUpload(true)}
            >
              Simulate upload error
            </Button>
          </div>
        </Field>
      </CardContent>
    </Card>
  )
}
