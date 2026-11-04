import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const docsDirectory = path.resolve(scriptDirectory, "..")
const source = path.join(docsDirectory, "registry", "styles", "tokens.css")

const publicStyles = path.join(docsDirectory, "public", "styles")
const htmlStyles = path.join(docsDirectory, "registry", "html", "tokens.css")
const reactStyles = path.join(docsDirectory, "registry", "react", "tokens.css")

const destinations = [
  path.join(publicStyles, "tokens.css"),
  htmlStyles,
  reactStyles,
]

await Promise.all(
  destinations.map(async (destination) => {
    await mkdir(path.dirname(destination), { recursive: true })
    await copyFile(source, destination)
  })
)
