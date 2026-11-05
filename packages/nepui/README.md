# nepui

CLI for installing [nepui](https://nepui.vercel.app) components — HTML or React, plain CSS. Components are copied from a remote registry, source-first, in the spirit of shadcn-style CLIs.

## Usage

```bash
npx nepui@latest init --target react
npx nepui@latest init --target html

npx nepui@latest init --target react . # current directory
npx nepui@latest init --target react my-app
npx nepui@latest init --target react --src .

npx nepui@latest init                 # prompts for target and directory

npx nepui@latest add button --target react
npx nepui@latest add button --target html

npx nepui@latest add button card spinner input textarea field avatar item --target react
npx nepui@latest add button card spinner input textarea field avatar item --target html

npx nepui@latest add --all --target html
npx nepui@latest add --all --target react

npx nepui@latest add button --target react
```

`init` downloads `tokens.css` to `components/nepui/tokens.css` for React or
`styles/tokens.css` for HTML, inside the selected project directory. React
initialization requires a valid `package.json` in that directory before it
installs dependencies. It also writes `nepui.json` in the project directory.
The `--src` option (or the interactive prompt) sets the source root used for
components and tokens; its default is `.`.

React initialization also installs
`class-variance-authority`, `cn`, and `@base-ui/react` using the project's
package manager.

`add` accepts one or more component names, comma-separated names, or `--all`.
It reads the target and source root from `nepui.json`; `--target` overrides the
configured target. If the config file is missing, the CLI asks before
continuing with the default HTML target and project root. Package dependencies
and dev dependencies declared by fetched registry items are installed with the
project's detected package manager.

[GitHub Repo](https://github.com/AkkalDhami/nepui)

[Website](https://nepui.vercel.app)

### Listing components

```bash
npx nepui@latest list                     # defaults to --target html
npx nepui@latest list --target react
npx nepui@latest ls --json
npx nepui@latest ls --json --target react
```

## License

MIT
