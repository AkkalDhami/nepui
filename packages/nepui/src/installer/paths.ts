import path from "node:path"
import { UnsafePathError } from "@/utils/errors.js"
import type { RegistryFile, Target } from "@/types"
import { DEFAULT_PATHS } from "@/constants"

function safeFilename(rawPath: string): string {
  const segments = rawPath
    .split(/[/\\]+/)
    .filter((segment) => segment.length > 0)
  const last = segments[segments.length - 1]

  if (!last || last === "." || last === "..") {
    throw new UnsafePathError(
      `Registry provided an invalid file name derived from "${rawPath}".`
    )
  }

  return last
}

/** Pick the filename to use for a registry file: prefer `target`, fall back to `path`. */
function filenameFor(file: RegistryFile): string {
  return safeFilename(file.target ?? file.path)
}

/**
 * Resolve the project-relative destination path for one registry file.
 * Returns a path like `components/ui/button/button.tsx` (using the host
 * OS's separator) — NOT yet resolved against `process.cwd()`.
 */
export function resolveRelativeDestination(
  file: RegistryFile,
  target: Target,
  componentName: string
): string {
  const filename = filenameFor(file)
  const ext = path.extname(filename).toLowerCase()

  if (target === "react") {
    return path.join(DEFAULT_PATHS.react, componentName, filename)
  }

  // target === "html"
  if (ext === ".css") {
    return path.join(DEFAULT_PATHS.css, filename)
  }

  return path.join(DEFAULT_PATHS.html, filename)
}

/**
 * Resolve a project-relative path to an absolute path, verifying it stays
 * inside `process.cwd()`. Throws `UnsafePathError` if it would not.
 */
export function resolveSafeAbsolutePath(relativePath: string): string {
  const cwd = process.cwd()
  const absolute = path.resolve(cwd, relativePath)
  const cwdWithSep = cwd.endsWith(path.sep) ? cwd : cwd + path.sep

  if (absolute !== cwd && !absolute.startsWith(cwdWithSep)) {
    throw new UnsafePathError(
      `Refusing to write outside the project directory:\n${relativePath}`
    )
  }

  return absolute
}

/** A fully-resolved destination for one registry file. */
export interface ResolvedFile {
  file: RegistryFile
  /** Project-relative path, using the host OS separator (for display). */
  relativePath: string
  /** Absolute, verified-safe path to write to. */
  absolutePath: string
}

/** Resolve and safety-check destinations for every file in a component. */
export function resolveAllDestinations(
  files: RegistryFile[],
  target: Target,
  componentName: string
): ResolvedFile[] {
  return files.map((file) => {
    const relativePath = resolveRelativeDestination(file, target, componentName)
    const absolutePath = resolveSafeAbsolutePath(relativePath)
    return { file, relativePath, absolutePath }
  })
}
