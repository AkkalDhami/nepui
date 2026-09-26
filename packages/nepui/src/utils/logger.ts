import kleur from "kleur"

let quiet = false

export function setQuiet(value: boolean): void {
  quiet = value
}

export function success(message: string): void {
  if (quiet) return
  console.log(kleur.green("✔"), message)
}

export function error(message: string): void {
  console.error(kleur.red("✖"), kleur.red(message))
}

export function warn(message: string): void {
  if (quiet) return
  console.warn(kleur.yellow("⚠"), kleur.yellow(message))
}

export function info(message: string): void {
  if (quiet) return
  console.log(message)
}

export function dim(message: string): string {
  return kleur.dim(message)
}

export function path(p: string): string {
  return kleur.cyan(p)
}

export function bold(message: string): string {
  return kleur.bold(message)
}

export function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2))
}

export function br(): void {
  console.log("")
}
