/** Base class for all errors that the CLI knows how to explain to the user. */
export abstract class CliError extends Error {
  /** Process exit code to use when this error terminates the CLI. */
  abstract readonly exitCode: number

  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}

/** Invalid CLI invocation: bad flags, bad arguments, bad component names, etc. */
export class UsageError extends CliError {
  readonly exitCode = 1
}

/** Registry could not be reached, returned an error status, or gave bad JSON. */
export class RegistryError extends CliError {
  readonly exitCode = 1
  readonly url?: string

  constructor(message: string, url?: string) {
    super(message)
    this.url = url
  }
}

/** Requested component does not exist in the registry (HTTP 404). */
export class ComponentNotFoundError extends CliError {
  readonly exitCode = 1
  readonly component: string
  constructor(component: string) {
    super(`Component "${component}" was not found.`)
    this.component = component
  }
}

/** A registry response was structurally invalid (missing fields, wrong types). */
export class RegistryValidationError extends CliError {
  readonly exitCode = 1
  readonly url?: string

  constructor(message: string, url?: string) {
    super(message)
    this.url = url
  }
}

/** A path derived from registry data would escape the project directory. */
export class UnsafePathError extends CliError {
  readonly exitCode = 1
}

/** Something went wrong writing files to disk. */
export class InstallationError extends CliError {
  readonly exitCode = 1
  readonly file?: string

  constructor(message: string, file?: string) {
    super(message)
    this.file = file
  }
}

/** The user explicitly cancelled an interactive prompt. */
export class UserCancelledError extends CliError {
  readonly exitCode = 0
}

/** True if `err` is a CliError we know how to format cleanly. */
export function isCliError(err: unknown): err is CliError {
  return err instanceof CliError
}
