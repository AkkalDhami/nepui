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

const PREVIEW_CSS = `
.np-preview {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 16px;
}

.np-preview-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.np-preview-section > h3 {
  margin: 0;

  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.np-preview-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.825rem;
}

.np-preview-row[data-align="start"] {
  align-items: flex-start;
}

.np-preview-row[data-align="center"] {
  align-items: center;
}

.np-preview-row[data-align="end"] {
  align-items: flex-end;
}

.np-preview-row[data-direction="column"] {
  flex-direction: column;
  align-items: stretch;
}

.np-preview-row[data-direction="column"][data-align="start"] {
  align-items: flex-start;
}

.np-preview-row[data-direction="column"][data-align="center"] {
  align-items: center;
}

.np-preview-row[data-direction="column"][data-align="end"] {
  align-items: flex-end;
}

.np-preview-row[data-gap="none"] {
  gap: 0;
}

.np-preview-row[data-gap="sm"] {
  gap: 0.25rem;
}

.np-preview-row[data-gap="md"] {
  gap: 0.5rem;
}

.np-preview-row[data-gap="lg"] {
  gap: 0.75rem;
}

.np-preview-row[data-gap="xl"] {
  gap: 1rem;
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
  gap: 1.125rem;
  padding: 2rem;
  font-family: "Inter",
    ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  background: var(--np-color-primary);
  color: var(--np-color-foreground);
}

${PREVIEW_CSS}
`
}
