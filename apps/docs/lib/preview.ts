const DOCS_THEME_MODE_CSS = `
:root {
  --np-color-primary: #ffffff;
  --np-color-foreground: #000000;
}

.dark {
  --np-color-primary: #000000;
  --np-color-foreground: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --np-color-primary: #000000;
    --np-color-foreground: #ffffff;
  }
}
`

const PLAYGROUND_THEME_MODE_CSS = `
:root {
  --np-color-primary: #f5f5f5;
  --np-color-foreground: #000000;
}

.dark {
  --np-color-primary: #171717;
  --np-color-foreground: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --np-color-primary: #171717;
    --np-color-foreground: #ffffff;
  }
}
`

export function getPreviewCss(type: "docs" | "playground") {
  return `
* {
  scrollbar-width: thin;
}


${type === "docs" ? DOCS_THEME_MODE_CSS : PLAYGROUND_THEME_MODE_CSS}
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  box-sizing: border-box;
  min-height: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  font-family: "Inter",
    ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  background: var(--np-color-primary);
  color: var(--np-color-foreground);
}
`
}
