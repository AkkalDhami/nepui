import type { RegistryComponent, Target } from "@/types"
import * as logger from "@/utils/logger.js"

const TARGET_LABEL: Record<Target, string> = {
  react: "React",
  html: "HTML",
}

/** Print the deterministic, human-readable component list for a target. */
export function printHumanList(
  target: Target,
  components: RegistryComponent[]
): void {
  logger.info("")
  logger.info(`nepui ${TARGET_LABEL[target].toLowerCase()} components`)
  logger.info("")

  if (components.length === 0) {
    logger.info("No components available.")
    logger.info("")
    logger.info("0 components")
    return
  }

  const nameWidth = Math.max(...components.map((c) => c.name.length)) + 4
  for (const component of components) {
    const label = component.title ?? ""
    logger.info(`- ${component.name.padEnd(nameWidth)}${label}`)
  }

  logger.info("")
  logger.info(
    `${components.length} component${components.length === 1 ? "" : "s"}`
  )
}
