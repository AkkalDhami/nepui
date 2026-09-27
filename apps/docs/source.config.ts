import { transformers } from "@/lib/highlight-code"
import { pageSchema } from "fumadocs-core/source/schema"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import z from "zod"
import { transformers } from "@/lib/highlight-code"
import { pageSchema } from "fumadocs-core/source/schema"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import z from "zod"
import { transformers } from "@/lib/highlight-code"
import { pageSchema } from "fumadocs-core/source/schema"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import z from "zod"

const contributorSchema = z.object({
  name: z.string(),
  url: z.url().optional(),
  avatar: z.url().optional(),
})

const contributorField = z.preprocess(
  (value) => (Array.isArray(value) ? value : [value]),
  z.array(contributorSchema)
)

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      contributor: contributorField.optional(),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: false,
    rehypePlugins: (plugins) => {
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "vesper",
          },
          defaultColor: false,
          transformers,
        },
      ])

      return plugins
    },
  },
})
