"use client"

import { CameraIcon } from "@phosphor-icons/react"

import {
  FileInput,
  FileInputItem,
  FileInputItemDetails,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  FileInputTrigger,
} from "@/registry/react/file-input"

export default function FileInputCamera() {
  return (
    <div style={{ width: "100%", maxWidth: "28rem" }}>
      <FileInput accept="image/*" capture="environment">
        <FileInputTrigger>
          <CameraIcon aria-hidden="true" />
          Take a photo
        </FileInputTrigger>
        <FileInputList aria-label="Photo">
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
