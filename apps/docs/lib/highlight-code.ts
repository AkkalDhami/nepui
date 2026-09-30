import { codeToHtml, ShikiTransformer } from "shiki"
import { createHash } from "node:crypto"
import { LRUCache } from "lru-cache"

// LRU cache for cross-request caching of highlighted code.
// Shiki highlighting is CPU-intensive and deterministic, so caching is safe.
const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour.
})

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source
        node.properties["__raw__"] = raw

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
          node.properties["__bun__"] = raw.replace("npm install", "bun add")
        } else if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create "
          )
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create "
          )
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        } else if (raw.startsWith("npm create")) {
          // npm create.
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm create", "yarn create")
          node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create")
          node.properties["__bun__"] = raw.replace("npm create", "bun create")
        } else if (raw.startsWith("npx")) {
          // npx.
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npx", "yarn dlx")
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        } else if (raw.startsWith("npm run")) {
          // npm run.
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm run", "yarn")
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm")
          node.properties["__bun__"] = raw.replace("npm run", "bun")
        }
      }
    },
  },
] as ShikiTransformer[]

export async function highlightCode(
  code: string,
  lang: string = "tsx",
  darkTheme: string = "vesper"
) {
  // Create cache key from code content and language.
  const cacheKey = createHash("sha256").update(`${lang}:${code}`).digest("hex")

  // Check cache first.
  const cached = highlightCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light-high-contrast",
      dark: darkTheme,
    },
    transformers: [
      ...transformers,
      // {
      //   pre(node) {
      //     node.properties["class"] =
      //       "no-scrollbar outline-none bg-background has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0"
      //   },
      //   code(node) {
      //     node.properties["data-line-numbers"] = ""
      //   },
      //   line(node) {
      //     node.properties["data-line"] = ""
      //   },
      // },
    ],
    defaultColor: false,
  })

  // Cache the result.
  highlightCache.set(cacheKey, html)
  return html
}
