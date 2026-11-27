"use client"

import { WordRotate } from "@/registry/react/word-rotate"

export default function WordRotateInline() {
  return (
    <p className="max-w-md text-base leading-7">
      Our team writes{" "}
      <WordRotate
        className="font-semibold"
        words={["plans", "specs", "notes"]}
      />{" "}
      that people actually read, then keeps them up to date as the product
      changes.
    </p>
  )
}
