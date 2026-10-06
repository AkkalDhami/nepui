"use client"

import { Button } from "@/registry/react/button"

export default function ButtonLink() {
  return (
    <Button
      variant="link"
      nativeButton={false}
      render={
        <a href="https://github.com/akkaldhami/nepui" target="_blank">
          Link
        </a>
      }
    />
  )
}
