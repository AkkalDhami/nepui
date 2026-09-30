import { ExamplesIndex } from "@/examples/__index__"

export function getExample({
  style,
  target,
  name,
}: {
  style: string
  target: string
  name: string
}) {
  return ExamplesIndex[style]?.[target]?.[name]
}
