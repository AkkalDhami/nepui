import { defineConfig } from "fumadocs-mdx/config"
import { transformers } from "./lib/highlight-code"

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light-default",
        dark: "vesper",
      },
      transformers: transformers,
    },
  },
})
