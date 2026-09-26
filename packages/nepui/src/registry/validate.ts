/**
 * Structural validation for registry responses.
 *
 * Registry JSON is untrusted input (it comes from the network). Nothing
 * here ever does `as RegistryItem` on raw data — every field is checked
 * before we treat the object as trustworthy.
 */
import { RegistryValidationError } from "@/utils/errors.js"
import type {
  RegistryComponent,
  RegistryFile,
  RegistryIndex,
  RegistryItem,
} from "@/types"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0
}

/**
 * Validate a raw JSON value as a `RegistryItem` (single component response).
 * Throws `RegistryValidationError` with a specific, actionable message on
 * the first structural problem found.
 */
export function validateRegistryItem(
  data: unknown,
  sourceUrl: string
): RegistryItem {
  if (!isRecord(data)) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nExpected a JSON object from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  if (!isNonEmptyString(data["name"])) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nThe "name" field is missing or invalid from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const rawFiles = data["files"]
  if (!Array.isArray(rawFiles) || rawFiles.length === 0) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nThe "files" field is missing or empty from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const files: RegistryFile[] = rawFiles.map((raw, index) =>
    validateRegistryFile(raw, index, sourceUrl)
  )

  const item: RegistryItem = {
    name: data["name"],
    files,
  }
  if (isNonEmptyString(data["$schema"])) item.$schema = data["$schema"]
  if (isNonEmptyString(data["title"])) item.title = data["title"]
  if (isNonEmptyString(data["description"]))
    item.description = data["description"]

  return item
}

function validateRegistryFile(
  raw: unknown,
  index: number,
  sourceUrl: string
): RegistryFile {
  if (!isRecord(raw)) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nfiles[${index}] is not a valid object in:\n${sourceUrl}`,
      sourceUrl
    )
  }

  if (!isNonEmptyString(raw["path"])) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nfiles[${index}].path is missing or invalid in:\n${sourceUrl}`,
      sourceUrl
    )
  }

  if (typeof raw["content"] !== "string") {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nfiles[${index}].content is missing from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  if (!isNonEmptyString(raw["type"])) {
    throw new RegistryValidationError(
      `Invalid registry response.\n\nfiles[${index}].type is missing or invalid in:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const file: RegistryFile = {
    path: raw["path"],
    content: raw["content"],
    type: raw["type"],
  }
  if (isNonEmptyString(raw["target"])) file.target = raw["target"]

  return file
}

/**
 * Validate a raw JSON value as a `RegistryIndex` (component list response).
 * Also enforces that component names are unique, since a duplicate name
 * indicates a broken registry rather than something safe to display twice.
 */
export function validateRegistryIndex(
  data: unknown,
  sourceUrl: string
): RegistryIndex {
  if (!isRecord(data)) {
    throw new RegistryValidationError(
      `Invalid registry index.\n\nExpected a JSON object from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const rawComponents = data["components"] ?? data["items"]
  if (!Array.isArray(rawComponents)) {
    throw new RegistryValidationError(
      `Invalid registry index.\n\nThe "components" or "items" field is missing or invalid from:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const seen = new Set<string>()
  const components: RegistryComponent[] = rawComponents.map((raw, index) => {
    const component = validateRegistryComponent(raw, index, sourceUrl)
    if (seen.has(component.name)) {
      throw new RegistryValidationError(
        `Invalid registry index.\n\nDuplicate component:\n  ${component.name}`,
        sourceUrl
      )
    }
    seen.add(component.name)
    return component
  })

  const result: RegistryIndex = { components }
  if (isNonEmptyString(data["$schema"])) result.$schema = data["$schema"]
  if (isNonEmptyString(data["name"])) result.name = data["name"]
  if (data["target"] === "html" || data["target"] === "react")
    result.target = data["target"]

  return result
}

function validateRegistryComponent(
  raw: unknown,
  index: number,
  sourceUrl: string
): RegistryComponent {
  if (!isRecord(raw)) {
    throw new RegistryValidationError(
      `Invalid registry index.\n\ncomponents[${index}] is not a valid object in:\n${sourceUrl}`,
      sourceUrl
    )
  }

  if (!isNonEmptyString(raw["name"])) {
    throw new RegistryValidationError(
      `Invalid registry index.\n\ncomponents[${index}].name is missing or invalid in:\n${sourceUrl}`,
      sourceUrl
    )
  }

  const component: RegistryComponent = { name: raw["name"] }
  if (isNonEmptyString(raw["title"])) component.title = raw["title"]
  if (isNonEmptyString(raw["description"]))
    component.description = raw["description"]
  if (isNonEmptyString(raw["url"])) component.url = raw["url"]
  if (Array.isArray(raw["categories"])) {
    component.categories = raw["categories"].filter(isNonEmptyString)
  }
  if (isNonEmptyString(raw["version"])) component.version = raw["version"]

  return component
}
