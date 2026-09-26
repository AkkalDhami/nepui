import { defineConfig } from "tsup"

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm"],
  // target: "node18",
  platform: "node",
  dts: false,
  clean: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  // shims: true,
  banner: {
    js: "#!/usr/bin/env node",
  },

  target: "es2022",
  outDir: "dist",

  shims: false,
})
