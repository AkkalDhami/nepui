import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
    ],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Browser JavaScript
  {
    files: ["**/*.js", "registry/react/**/*./*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // React / TypeScript
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    plugins: {
      "react-hooks": reactHooks,
    },

    rules: {
      ...reactHooks.configs["recommended-latest"].rules,

      "react-hooks/incompatible-library": "off",
      "react-hooks/purity": "off",
    },
  },

  // TypeScript handles undefined identifiers itself.
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": "off",
    },
  }
)
