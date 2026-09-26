export type Target = "html" | "react"

export const VALID_TARGETS: readonly Target[] = ["html", "react"]

export interface RegistryFile {
  /** Original path in the registry's own source tree (informational only). */
  path: string
  /** Exact file content to write verbatim. This is the source of truth. */
  content: string
  /** Registry file classification, e.g. "registry:component", "registry:style". */
  type: string
  /** Suggested destination path (relative). Never trusted blindly — see paths.ts. */
  target?: string
}

/** A single component response: GET /r/<target>/<component>.json */
export interface RegistryItem {
  $schema?: string
  name: string
  title?: string
  description?: string
  files: RegistryFile[]
}

/** One entry inside a registry index (list) response. */
export interface RegistryComponent {
  name: string
  title?: string
  description?: string
  url?: string
  categories?: string[]
  version?: string
}

/** The component index response: GET /r/<target>/index.json */
export interface RegistryIndex {
  $schema?: string
  name?: string
  target?: Target
  components: RegistryComponent[]
}
