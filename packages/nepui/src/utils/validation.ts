import { VALID_TARGETS, type Target } from "@/types/index"
import { UsageError } from "./errors.js"

const COMPONENT_NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

/**
 * Validate and normalize a `--target` value.
 * Throws UsageError with a helpful message if invalid.
 */
export function validateTarget(value: string | undefined): Target {
  if (!value) {
    throw new UsageError(
      `Missing required option "--target".\n\n` +
        `Supported targets:\n` +
        VALID_TARGETS.map((t) => `  - ${t}`).join("\n")
    )
  }

  if (!isValidTarget(value)) {
    throw new UsageError(
      `Invalid target "${value}".\n\n` +
        `Supported targets:\n` +
        VALID_TARGETS.map((t) => `  - ${t}`).join("\n")
    )
  }

  return value
}

export function isValidTarget(value: string): value is Target {
  return (VALID_TARGETS as readonly string[]).includes(value)
}

/**
 * Validate a component name before it is ever interpolated into a URL or
 * filesystem path. Rejects path traversal sequences, absolute paths,
 * separators, and anything not matching the safe name pattern.
 */
export function validateComponentName(name: string): string {
  const trimmed = name.trim()

  if (trimmed.length === 0) {
    throw new UsageError("Component name cannot be empty.")
  }

  if (
    trimmed.includes("..") ||
    trimmed.includes("/") ||
    trimmed.includes("\\") ||
    trimmed.startsWith(".")
  ) {
    throw new UsageError(
      `Invalid component name "${name}".\n\n` +
        `Component names may only contain lowercase letters, numbers, and hyphens (e.g. "button", "dropdown-menu").`
    )
  }

  if (!COMPONENT_NAME_PATTERN.test(trimmed)) {
    throw new UsageError(
      `Invalid component name "${name}".\n\n` +
        `Component names may only contain lowercase letters, numbers, and hyphens (e.g. "button", "dropdown-menu").`
    )
  }

  return trimmed
}
