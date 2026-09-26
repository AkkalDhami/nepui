import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"

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
  }
)
