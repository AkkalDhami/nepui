// Generates colors.css: the color palette plus bg / text / border utilities.
//
// Workflow
//   1. Add or edit a --np-* variable in the :root block of colors.css.
//   2. Run:  npx tsx scripts/generate-colors.mts
//   3. Every utility is regenerated, including for new colors and new shades.
//
// Usage
//   npx tsx scripts/generate-colors.mts [input.css] [output.css] [--check]
//
//   input.css   file containing the --np-* variables   (default: colors.css)
//   output.css  file to write                          (default: same as input)
//   --check     write nothing, exit 1 if output is out of date (for CI)
//
// Nothing is hardcoded about which colors exist. Any variable named
// --np-{name}-{shade} becomes a color family, and any variable named
// --np-{name} (like --np-black) becomes a single color.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve, relative } from "node:path"

/** Add an entry here to generate another utility family, e.g. ring or fill. */
const UTILITIES = [
  { title: "Background utilities", name: "bg", property: "background-color" },
  { title: "Text utilities", name: "text", property: "color" },
  { title: "Border utilities", name: "border", property: "border-color" },
] as const

const PREFIX = "np"

const args = process.argv.slice(2)
const checkOnly = args.includes("--check")
const [inputArg, outputArg] = args.filter((a) => !a.startsWith("--"))

const inputPath = resolve(inputArg ?? "colors.css")
const outputPath = resolve(outputArg ?? inputArg ?? "colors.css")

if (!existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`)
  process.exit(1)
}

// Comments are stripped so commented-out variables are ignored.
const source = readFileSync(inputPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "")

// Declarations only: `--np-red-50: value;`. References like var(--np-red-50)
// are followed by ")" instead of ":", so generated utilities never match.
const declaration = new RegExp(
  `--${PREFIX}-([a-z][a-z0-9-]*)\\s*:\\s*([^;]+);`,
  "g"
)

const variables = new Map<string, string>()
for (const match of source.matchAll(declaration)) {
  const [, name, value] = match
  if (variables.has(name)) {
    console.warn(`Duplicate --${PREFIX}-${name}, using the last value.`)
  }
  variables.set(name, value.trim())
}

if (variables.size === 0) {
  console.error(`No --${PREFIX}-* variables found in ${inputPath}`)
  process.exit(1)
}

/* Group: families (name-shade) and singles (black, white, ...)               */

interface Shade {
  shade: number
  value: string
}

const families = new Map<string, Shade[]>() // keeps first-seen order
const singles: { name: string; value: string }[] = []

for (const [name, value] of variables) {
  const m = name.match(/^(.+)-(\d+)$/)
  if (m) {
    const family = m[1]
    if (!families.has(family)) families.set(family, [])
    families.get(family)!.push({ shade: Number(m[2]), value })
  } else {
    singles.push({ name, value })
  }
}

for (const shades of families.values()) shades.sort((a, b) => a.shade - b.shade)

/** Ordered list of every token: red-50 ... taupe-950, then black, white. */
const tokens: string[] = [
  ...[...families].flatMap(([family, shades]) =>
    shades.map((s) => `${family}-${s.shade}`)
  ),
  ...singles.map((s) => s.name),
]

/* Write                                                                      */

const lines: string[] = []

lines.push(
  "/*",
  " * nepui colors.css - Color palette and utility classes.",
  " *",
  ` * Edit the source palette in ${relative(process.cwd(), inputPath)}, then run:`,
  " * > pnpm --filter docs colors:generate",
  " * The utility classes after the palette are generated.",
  " ! ⚠️ Do not edit this generated file directly.",
  " */",
  "",
  "/* Color palette */",
  ":root {"
)

;[...families].forEach(([family, shades], i) => {
  if (i > 0) lines.push("")
  for (const s of shades)
    lines.push(`  --${PREFIX}-${family}-${s.shade}: ${s.value};`)
})
if (singles.length > 0) {
  if (families.size > 0) lines.push("")
  for (const s of singles) lines.push(`  --${PREFIX}-${s.name}: ${s.value};`)
}
lines.push("}", "")

for (const util of UTILITIES) {
  lines.push(`/* ${util.title} */`, "")
  for (const token of tokens) {
    lines.push(
      `.${util.name}-${token},`,
      `.${PREFIX}-${util.name}-${token} {`,
      `  ${util.property}: var(--${PREFIX}-${token});`,
      "}",
      ""
    )
  }
}

const output = lines.join("\n")
const displayPath = relative(process.cwd(), outputPath) || outputPath

const summary =
  `${families.size} families, ${tokens.length} colors, ` +
  `${tokens.length * UTILITIES.length} utility rules (each with a ${PREFIX}- alias)`

if (checkOnly) {
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : ""
  if (current !== output) {
    console.error(
      `\n✗ ${displayPath} is out of date. Run: npx tsx scripts/generate-themes.mts`
    )
    process.exit(1)
  }
  console.log(`\n✓ ${displayPath} is up to date`)
  console.log(`\n${summary}`)
} else {
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, output)
  console.log(`\n✓ Generated ${displayPath}`)
  console.log(`✓ ${summary}`)
}
