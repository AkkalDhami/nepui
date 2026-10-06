import { ExamplesIndex } from "@/examples/__index__"
import { TargetType } from "@/hooks/use-config"

export function getExample({
  style,
  target,
  name,
}: {
  style: string
  target: TargetType
  name: string
}) {
  return ExamplesIndex[style]?.[target]?.[name]
}
