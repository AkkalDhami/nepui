import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const docsDirectory = path.resolve(scriptDirectory, "..")
const source = path.join(docsDirectory, "registry", "react", "tokens.css")
const publicStyles = path.join(docsDirectory, "public", "styles")
const destination = path.join(publicStyles, "tokens.css")

await mkdir(publicStyles, { recursive: true })
await copyFile(source, destination)
