# nepui

CLI for installing [nepui](https://nepui.vercel.app) components — HTML or React, plain CSS, no runtime or component-library dependencies. Components are copied from a remote registry, source-first, in the spirit of shadcn-style CLIs.

## Usage

```bash
npx nepui add button --target react
npx nepui add button --target html
npx nepui@latest add button --target react
```

`--target` is required for `add` and must be `html` or `react`.

[GitHub Repo](https://github.com/AkkalDhami/nepui)

[Website](https://nepui.vercel.app)

### Listing components

```bash
npx nepui list                     # defaults to --target html
npx nepui list --target react
npx nepui ls --json
npx nepui ls --json --target react
```

## How it works

1. Fetches `<registry>/r/<target>/<component>.json`.
2. Validates the response (`name`, `files`, `files[].content`, ...).
3. Resolves a safe destination for every file:
   - React: `components/ui/<component>/<filename>`
   - HTML: `.html`/`.js` → `html/<filename>`, `.css` → `styles/<filename>`
4. Warns and asks before overwriting any existing file (Overwrite / Skip / Cancel). A clean install with no conflicts needs no prompts.
5. Writes files, then prints exactly what was created.

The registry response's `files[].content` is written verbatim — nothing is reformatted, reparsed, or modified.

## License

MIT
