# AGENTS.md — building components for nepui

nepui is a component library written in **plain CSS** with two flavours of every component:

- **React** — built on [Base UI](https://base-ui.com) primitives where one exists, styled by the component's CSS file.
- **HTML** — the same CSS, used with classes or data attributes. No framework, no JavaScript required.

Components follow the look and behaviour of shadcn/ui (base-ui flavour), but are re-implemented in plain CSS. **Never ship Tailwind classes in a component's source.** Convert them to CSS (see "Porting from shadcn" below).

When asked to build a component, produce **all** the deliverables listed in "Deliverables" and follow every rule in this file.

---

## 1. Deliverables for one component

For a component named `<name>` (kebab-case, e.g. `button-group`):

```text
<name>/
├── <name>.css                  # all styles; works for React and HTML
├── <name>.tsx                  # React component
├── index.ts                    # barrel export
├── index.html                  # standalone demo page (full HTML document, dark toggle)
├── <name>.mdx                  # React docs
├── <name>-html.mdx             # HTML docs
└── demos/
    ├── <name>-demo.tsx         # React previews (one file per ComponentPreview)
    ├── <name>-<feature>.tsx
    └── html/
        ├── <name>-demo.html    # HTML previews (fragments, no <html>/<head>)
        └── <name>-<feature>.html
```

Always create real files, then present them. Never only paste code in a reply.

After writing, **verify**: CSS braces balance, no leftover references to removed names (`grep`), every `ComponentPreview name="…"` in the docs has a demo file in both folders.

---

## 2. Naming rules

Everything is prefixed with `np-`.

| Thing                  | Class                    | Data attribute                  |
| ---------------------- | ------------------------ | ------------------------------- |
| Component              | `np-<name>`              | `data-np-<name>`                |
| Part (sub-component)   | `np-<name>-<part>`       | `data-np-<name>-<part>`         |
| Variant (non-default)  | `np-<name>-<variant>`    | `data-variant="<variant>"`      |
| Size (non-default)     | `np-<name>-<size>`       | `data-size="<size>"`            |
| Orientation            | `np-<name>-vertical`     | `data-orientation="vertical"`   |
| Other axes             | `np-<name>-<value>`      | `data-<axis>="<value>"` (e.g. `data-appearance`, `data-radius`, `data-align`) |
| Boolean feature        | `np-<name>-<feature>`    | `data-<feature>` (e.g. `data-dot`, `data-pulse`) |

Rules:

- **Every hook has both forms.** A class alias and a data attribute must do exactly the same thing.
- The **default** value of an axis needs no class (`np-button` is the default variant and size).
- CSS custom properties are named `--np-<name>-<property>`, e.g. `--np-button-height`.
- React sets `data-slot="<name>"` (and `data-slot="<name>-<part>"`) on elements. `data-slot` is for React/debugging; CSS must **not depend on it**, so plain HTML works.
- State is expressed with native/ARIA attributes first, then a data fallback:

| State       | Selector                                                  |
| ----------- | --------------------------------------------------------- |
| disabled    | `:disabled, [aria-disabled="true"], [data-disabled]`      |
| invalid     | `[aria-invalid="true"], [data-invalid]`                   |
| expanded    | `[aria-expanded="true"], [data-popup-open]`               |
| checked     | `:checked, [data-checked], [aria-checked="true"]`         |
| focus       | `:focus-visible`                                          |

---

## 3. Tokens

All tokens live in `tokens.css` (one level above each component folder: `../tokens.css`). **Read `tokens.css` before writing CSS. Only use tokens that exist there**, or give a fallback: `var(--np-input, var(--np-border))`.

Tokens used across the library:

| Purpose            | Tokens                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Surfaces / text    | `--np-background`, `--np-foreground`, `--np-muted`, `--np-muted-foreground`              |
| Brand              | `--np-primary`, `--np-primary-foreground`, `--np-secondary`, `--np-secondary-foreground` |
| Lines / focus      | `--np-border`, `--np-input` (optional, fall back to `--np-border`), `--np-ring`          |
| Status             | `--np-destructive`, `--np-success`, `--np-warning` (`--np-info` is hard-coded in badge.css) |
| Radius             | `--np-radius-md` (default control radius), `--np-radius-sm` (optional), `--np-radius`    |
| Fonts              | `--np-font-sans`, `--np-font-mono` (optional, always give a fallback)                    |
| Spacing unit       | `--np-spacing` (`0.25rem`, **unprefixed**)                                                  |

- **Spacing:** when porting Tailwind spacing, use `calc(var(--np-spacing) * n)` (Tailwind `p-2.5` → `calc(var(--np-spacing) * 2.5)`). Plain `rem` is acceptable for one-off values.
- **Colors are always `var(--np-…)`.** Never hard-code a color, except white text on solid status colors (`#fff`).
- **Opacity** uses `color-mix`: `bg-primary/10` → `color-mix(in oklch, var(--np-primary) 10%, transparent)`. Use `oklch` for hue-preserving mixes, `oklab` for neutral ones. Be consistent inside one file.
- Do not invent new global tokens. If a component needs a knob, make a component variable (`--np-<name>-<prop>`).


**`tokens.css`**
```css
/**
 * nepui — design tokens
*/

:root {
  color-scheme: light;

  --np-radius: 0.625rem;
  --np-radius-sm: calc(var(--np-radius) * 0.6);
  --np-radius-md: calc(var(--np-radius) * 0.8);
  --np-radius-lg: var(--np-radius);
  --np-radius-xl: calc(var(--np-radius) * 1.4);
  --np-radius-2xl: calc(var(--np-radius) * 1.8);
  --np-radius-3xl: calc(var(--np-radius) * 2.2);
  --np-radius-4xl: calc(var(--np-radius) * 2.6);
  --np-radius-full: 9999px;

  --np-spacing: 0.25rem;

  --np-background: #ffffff;
  --np-foreground: #0a0a0a;

  --np-card: #ffffff;
  --np-card-foreground: #0a0a0a;

  --np-popover: #ffffff;
  --np-popover-foreground: #0a0a0a;

  --np-primary: #12b417;
  --np-primary-foreground: #ffffff;

  --np-secondary: #f4f4f5;
  --np-secondary-foreground: #18181b;

  --np-muted: #f4f4f5;
  --np-muted-foreground: #737373;

  --np-accent: #f4f4f5;
  --np-accent-foreground: #18181b;

  --np-destructive: #e7000b;

  --np-success: #16a34a;
  --np-success-foreground: #fafafa;

  --np-warning: #d97706;
  --np-warning-foreground: #fafafa;

  --np-border: #e5e5e5;
  --np-input: #e4e4e7;
  --np-ring: #a1a1a1;

  --np-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --np-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --np-shadow-md:
    0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --np-shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Explicit dark theme — class or data-attribute toggle (next-themes, etc.) */
.dark,
[data-theme="dark"] {
  color-scheme: dark;

  --np-radius: 0.625rem;
  --np-radius-sm: calc(var(--np-radius) * 0.6);
  --np-radius-md: calc(var(--np-radius) * 0.8);
  --np-radius-lg: var(--np-radius);
  --np-radius-xl: calc(var(--np-radius) * 1.4);
  --np-radius-2xl: calc(var(--np-radius) * 1.8);
  --np-radius-3xl: calc(var(--np-radius) * 2.2);
  --np-radius-4xl: calc(var(--np-radius) * 2.6);
  --np-radius-full: 9999px;

  --np-spacing: 0.25rem;

  --np-background: #0a0a0a;
  --np-foreground: #fafafa;

  --np-card: #0a0a0a;
  --np-card-foreground: #fafafa;

  --np-popover: #ffffff;
  --np-popover-foreground: #0a0a0a;

  --np-primary: #ffffff;
  --np-primary-foreground: #0a0a0a;

  --np-secondary: #27272a;
  --np-secondary-foreground: #fafafa;

  --np-muted: #27272a;
  --np-muted-foreground: #a1a1aa;

  --np-accent: #27272a;
  --np-accent-foreground: #fafafa;

  --np-destructive: #e7000b;

  --np-success: #01a041;
  --np-success-foreground: #f0fdf4;

  --np-warning: #ad4407;
  --np-warning-foreground: #fffbeb;

  --np-border: #ffffff1a;
  --np-input: #ffffff26;
  --np-ring: #737373;

  --np-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --np-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
  --np-shadow-md:
    0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --np-shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
}

/* OS-level dark mode when no explicit theme has been chosen */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not(.light) {
    color-scheme: dark;

    --np-radius: 0.625rem;
    --np-radius-sm: calc(var(--np-radius) * 0.6);
    --np-radius-md: calc(var(--np-radius) * 0.8);
    --np-radius-lg: var(--np-radius);
    --np-radius-xl: calc(var(--np-radius) * 1.4);
    --np-radius-2xl: calc(var(--np-radius) * 1.8);
    --np-radius-3xl: calc(var(--np-radius) * 2.2);
    --np-radius-4xl: calc(var(--np-radius) * 2.6);
    --np-radius-full: 9999px;

    --np-spacing: 0.25rem;

    --np-background: #0a0a0a;
    --np-foreground: #fafafa;

    --np-card: #0a0a0a;
    --np-card-foreground: #fafafa;

    --np-popover: #0a0a0a;
    --np-popover-foreground: #fafafa;

    --np-primary: #12b417;
    --np-primary-foreground: #0a0a0a;

    --np-secondary: #27272a;
    --np-secondary-foreground: #fafafa;

    --np-muted: #27272a;
    --np-muted-foreground: #a1a1aa;

    --np-accent: #27272a;
    --np-accent-foreground: #fafafa;

    --np-destructive: #e7000b;

    --np-success: #01a041;
    --np-success-foreground: #f0fdf4;

    --np-warning: #ad4407;
    --np-warning-foreground: #fffbeb;

    --np-border: #ffffff1a;
    --np-input: #ffffff26;
    --np-ring: #737373;

    --np-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
    --np-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
    --np-shadow-md:
      0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
    --np-shadow-lg:
      0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
  }
}
```

---

## 4. CSS rules (`<name>.css`)

### 4.1 File shape

1. A header comment: what it is, every class/data hook, variables, tokens used.
2. Base rule on `.np-<name>, [data-np-<name>]` that **declares all component variables, then the layout**.
3. States (focus, disabled, invalid).
4. Variants, sizes, other axes, parts.
5. Dark mode block (always last).
6. `@media (prefers-reduced-motion: reduce)` if there is any animation or transform.

### 4.2 Variables live on the element — never on `:root`

Declare variables in the base rule, on the element itself. Variants and sizes **redefine variables**; they do not repeat properties. This is what lets users override a value with `style="--np-x-radius: 0"`.

```css
.np-badge,
[data-np-badge] {
  --np-badge-height: 1.5rem;
  --np-badge-radius: 9999px;

  height: var(--np-badge-height);
  border-radius: var(--np-badge-radius);
}

.np-badge-lg,
:is(.np-badge, [data-np-badge])[data-size="lg"] {
  --np-badge-height: 1.75rem;
}
```

Why: a variable set on `:root` is **shadowed** by the base rule that redeclares it on the element, so a dark-mode or theme override on `:root` silently does nothing. (This bug has happened.)

A variable that you read with a fallback and do **not** redeclare (`height: var(--np-separator-size, 1px)`) can be set by users on a parent. Use that pattern when you want parent-level theming.

### 4.3 Selector shape

Always write the two hooks together, and use `:is()` so the data attribute works without the class:

```css
/* correct */
.np-button-outline,
:is(.np-button, [data-np-button])[data-variant="outline"] { … }

/* WRONG: only matches when the class is present, so data-np-button alone breaks */
.np-button[data-variant="outline"] { … }
```

Rules that apply to the component in a state use `:is(.np-x, [data-np-x]):hover` and so on.

### 4.4 Specificity and order

- Variant/size rules go **after** the base rule. Class aliases (0,1,0) and `:is()[data-…]` forms (0,2,0) both work because they only set variables.
- State rules (`:focus-visible`, `:disabled`, `[aria-invalid]`) set properties directly. **The invalid rule must come after the focus rule and have equal or higher specificity**, so a focused invalid control stays red.
- `:has()` takes the specificity of its most specific argument. If a `:has(:is(…):focus-visible)` focus rule outranks an invalid rule, wrap the inner list in `:where()` to lower it. (This bug has happened in Input Group.)
- To override another component's rule (for example the input inside an input group), either raise specificity with a scoping ancestor (`.np-input-group .np-input-group-input`) or include the state selectors in your override.
- If a rule must beat a class from another stylesheet in any load order, double the selector: `:is(.a, [data-a]):is(.a, [data-a])`.
- Never use `!important`.

### 4.5 Standard behaviours

**Focus**

```css
:is(.np-x, [data-np-x]):focus-visible {
  border-color: var(--np-ring);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--np-ring), transparent 50%);
}
```

Controls without a border use only the box-shadow ring.

**Disabled**

```css
… :is(:disabled, [aria-disabled="true"], [data-disabled]) {
  opacity: 0.5;
  pointer-events: none;
}
```

Do not add `cursor: not-allowed` together with `pointer-events: none` (it can never show). Use one or the other.

**Invalid**

```css
… :is([aria-invalid="true"], [data-invalid]) {
  border-color: var(--np-destructive);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--np-destructive), transparent 80%);
}
```

**Icons.** Size SVG children from a variable, unless the icon sets its own size:

```css
:is(.np-x, [data-np-x]) svg { flex-shrink: 0; pointer-events: none; }
:is(.np-x, [data-np-x]) svg:not([class*="size-"]) {
  width: var(--np-x-icon-size);
  height: var(--np-x-icon-size);
}
```

**Text inputs.** `font-size: 1rem` below 768px (prevents iOS zoom), and the component's size variable from `@media (min-width: 48rem)`.

**Layout.** Use `box-sizing: border-box`. Prefer **logical properties** (`margin-inline-start`, `padding-block`, `border-start-end-radius`) so RTL works.

**Motion.** Transitions use `150ms ease` on color/border/shadow properties. Honour `prefers-reduced-motion`.

### 4.6 Dark mode (required pattern)

Colors come from tokens, so most components need nothing. Add a dark block only when a value must differ (translucent backgrounds such as `bg-input/30`). It has two parts that set the same variables, **on the element**, **after** the variant rules:

```css
/* 1. Explicit */
:is(.dark, [data-theme="dark"]) :is(.np-x, [data-np-x]) {
  --np-x-bg: color-mix(in oklab, var(--np-x-border) 30%, transparent);
}

/* 2. System preference, unless the page forces light */
@media (prefers-color-scheme: dark) {
  :root:not(.light, [data-theme="light"]) :is(.np-x, [data-np-x]) {
    --np-x-bg: color-mix(in oklab, var(--np-x-border) 30%, transparent);
  }
}
```

### 4.7 Reference sizes

Heights share a scale so controls line up side by side.

| Size    | Button / Input | Icon button |
| ------- | -------------- | ----------- |
| xs      | 1.5rem         | 1.5rem      |
| sm      | 1.75rem        | 1.75rem     |
| default | 2rem           | 2rem        |
| lg      | 2.25rem        | 2.25rem     |

Control radius is `var(--np-radius-md)`. `xs` uses `min(var(--np-radius-md), 10px)` and `sm` uses `min(var(--np-radius-md), 12px)`. Badge is the exception: its default is a pill (`radius="full"`), and default height is `1.5rem`.

---

## 5. React rules (`<name>.tsx`)

- **Target React 19.** Plain function components; `ref` is a normal prop. Do not use `forwardRef`.
- Add `"use client"` only if the file uses hooks, event handlers that need it, or a Base UI primitive. Pure presentational components (e.g. Kbd) omit it.
- Types: `import type { ComponentProps } from "react"` and use `ComponentProps<"div">`. Do not `import * as React` just for types.
- Imports, in this order, exactly in this style:

```tsx
"use client"

import type { ComponentProps } from "react"
import { Foo as FooPrimitive } from "@base-ui/react/foo"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Label } from "../label"          // sibling nepui components: relative

// NOTE: Update these paths if needed
import "../tokens.css"
import "./<name>.css"
```

- **Use a Base UI primitive when one exists** (`Button`, `Input`, `Checkbox`, `Separator`, …) and pass it `data-slot`. For "render as another element" support use `useRender` + `mergeProps` from `@base-ui/react`.
- **Variants:** use `cva` where there is more than one axis. Variant values map to CSS **class aliases**; the default maps to `""`.

```tsx
const badgeVariants = cva("np-badge", {
  variants: {
    variant: { default: "", secondary: "np-badge-secondary" },
    size: { default: "", sm: "np-badge-sm" },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

  Export the `cva` function (`export { Badge, badgeVariants }`) so it can style non-React elements. Derive prop types with `VariantProps` and `NonNullable<…>`.

- **`className` can be a function** on Base UI components (`string | (state) => string`). Handle it:

```tsx
className={(state) =>
  cn("np-x", typeof className === "function" ? className(state) : className)
}
```

- Always run class names through `cn(…, className)` so user classes are appended.
- Where a native prop name collides with a variant (`size` on `<input>`, `color` on HTML elements), **`Omit` the native one** and use the variant.
- Set data attributes for axes when it helps plain-CSS users: `data-variant`, `data-size`, `data-orientation`, and boolean features as `data-dot={dot ? "" : undefined}`.
- Custom CSS properties passed through `style` need a cast: `{ "--np-x-color": value } as CSSProperties`. Merge with the user's `style` (`{ "--np-x-color": value, ...style }`).
- **No icon library inside components.** If a component needs an icon, write a tiny inline SVG component in the same file (stroke `currentColor`, `strokeWidth={2}`, round caps, `aria-hidden`).
- Add a short JSDoc to each exported component and prop.
- Compound components export every part from the barrel (`index.ts`), alphabetised within the export block. Parts that wrap other nepui components import them via `../<name>`.

---

## 6. HTML rules

- HTML previews and docs use **classes by default**; show the `data-np-*` form in the docs and in `index.html`.
- Use native elements and ARIA: `<fieldset>`/`<legend>`, `<label for>`, `role="group"`, `role="separator"`, `aria-describedby`, `aria-invalid`, `aria-busy`.
- Decorative SVGs get `aria-hidden="true"`. Icon-only buttons get `aria-label`.
- Inside a `<label>`, only phrasing content is valid. Use `<span>` for card parts, not `<div>`/`<p>`.
- No inline `<script>` in previews. Use native attributes or an `oninput="…"` handler for tiny interactions.
- Inline SVG icons use Lucide-style paths: `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.

### `index.html` (standalone page)

A complete document: `<!doctype html>`, charset, viewport, `<link rel="stylesheet" href="../tokens.css">`, links to every dependency's CSS (`../button/button.css` …), then `./<name>.css` last. Small inline `<style>` for page layout only. Include a **"Toggle dark"** button:

```html
<button class="np-button np-button-outline np-button-sm" type="button"
  onclick="document.documentElement.classList.toggle('dark')">Toggle dark</button>
```

Show: class form, data-attribute form, every variant/size, disabled, invalid, dark.

---

## 7. Demos (ComponentPreview files)

- One file per `ComponentPreview name="…"`. Name: `<name>-demo` for the main one, `<name>-<feature>` for the rest.
- **React demo:** `"use client"`, a default-exported function named in PascalCase (`BadgeDemo`), imports from `@/registry/react/<name>` (and other components from their registry path). **Inline `style` only**: no Tailwind, no extra CSS files.
- **HTML demo:** a fragment (no `<html>`, `<head>`, or `<link>`), classes, inline styles. The docs list needed stylesheets in `styles={[…]}`, and scripts in scripts={[..]}.
- The two flavours must **look the same**: same content, same layout.
- **The main demo (`<name>-demo`) must be simple and clear**: a few elements, no layout noise, shows the default use. Put realistic compositions in later, feature-specific demos.
- **Do not use `.map()`** in demos. Write the elements out so the code is copy-paste friendly.
- React demos use `@phosphor-icons/react` icons (`MagnifyingGlassIcon`, `CheckCircleIcon`, … always with the `Icon` suffix). HTML demos use inline SVG.
- Give form controls accessible names (`aria-label` or `<label for>`); give groups `aria-label`.
- Use the real tokens in inline styles: `var(--np-muted-foreground)`, `var(--np-border)`, `var(--np-destructive)`.
- Width pattern for form demos: `style={{ width: "100%", maxWidth: "24rem" }}`.

---

## 8. Docs (MDX)

Two files per component: `<name>.mdx` (React) and `<name>-html.mdx` (HTML). **No `# H1`** (the title comes from front-matter). Sections are separated by `---`.

### Front-matter

```mdx
---
title: Badge
description: A badge displays a short piece of information, such as a status, a label or a count.
contributor:
  - name: Akkal Dhami
    url: https://www.akkal.com.np
    avatar: https://avatars.githubusercontent.com/u/170957638?v=4
---
```

### React docs skeleton

```mdx
<ComponentPreview
  name="badge-demo"
/>

---

## Installation

<ManualInstallation
  cli={
    <ReactCodeBlockCommand
      shadcn="npx shadcn@latest add https://nepui.vercel.app/r/react/badge.json"
      nepui="npx nepui@latest add badge --target react"
    />
  }
  manual={
    <Steps>
      <Step>Install the following dependencies:</Step>
      <PackageManagerTabs command="npm install @base-ui/react class-variance-authority cn" className="mt-6"/>

      <Step>Copy and paste the following code into your project.</Step>
      <ComponentSource
        target="react"
        name="badge"
        title="components/nepui/badge/badge.css"
        fileTarget="components/nepui/badge/badge.css"
      />
      {/* repeat for badge.tsx and index.ts */}

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>
  }
/>

---

## Usage

(import line, then a minimal example)

---

## Composition (if the structure is complex)

--

## <Feature>   (one section per feature, each with a ComponentPreview)

---

## API Reference              (one table per exported component: Prop | Type | Default)
```

Rules:

- List **only real dependencies** in the install command (`cn` always; `class-variance-authority` only if `cva` is used; `@base-ui/react` only if a primitive is used).
- If the component imports other nepui components, add a `<Step>` telling the reader to add them, with links to `/docs/components/react/<name>`.
- Table pipes inside cells are escaped: `\|`.
- API tables: `className` is `string` (or `string \| (state) => string` for Base UI parts).

### HTML docs skeleton

Same structure with `target="html"` on every preview and these differences:

```mdx
<ManualInstallation
  cli={
    <PackageManagerTabs
      command="npx nepui@latest add badge"
      className="mt-4"
    />
  }
  manual={
    <Steps>
      <Step>Copy and paste the following code into your project.</Step>
      <ComponentSource
        target="html"
        name="badge"
        title="styles/badge.css"
        fileTarget="styles/badge.css"
      />
      <Step>Update the import paths to match your project setup.</Step>
    </Steps>
  }
/>
```

- **Usage:** show the `<link rel="stylesheet" href="./styles/<name>.css">`, then `class="np-<name>"`, then the `data-np-<name>` alternative.
- Add **reference tables** `| Name | Data attribute | Class alias |` for every axis (variants, sizes, orientation, …) and for parts.
- Previews that depend on other stylesheets declare them: `styles={["/button/button.css", "/input/input.css"]}`.
- If a feature needs another component's stylesheet (Spinner, Label…), say so and show the `<link>` first, as in the Button "Spinner" section.
- Link other components with `/docs/components/html/<name>`.

---

## 9. Porting from shadcn (Tailwind → plain CSS)

Start from the shadcn source and the docs page of the **base** flavour (`https://ui.shadcn.com/docs/components/base/<name>`). Reproduce behaviour faithfully, including states, edge cases and the docs sections that make sense. If a section needs a component nepui does not have yet (Select, Slider, Radio, Switch, Tooltip, Combobox…), skip it and say so; do not fake it.

| Tailwind                                  | CSS                                                              |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `bg-primary/80`                           | `color-mix(in oklch, var(--np-primary) 80%, transparent)`        |
| `border-input`                            | `var(--np-input, var(--np-border))`                              |
| `rounded-lg` / `rounded-md`               | `var(--np-radius-md)`                                            |
| `h-8`, `px-2.5`, `gap-1.5`                | `calc(var(--np-spacing) * 8)`, `calc(var(--np-spacing) * 2.5)`, …      |
| `text-sm` / `text-xs`                     | `0.875rem` / `0.75rem`                                           |
| `ring-3 ring-ring/50`                     | `box-shadow: 0 0 0 3px color-mix(in oklch, var(--np-ring), transparent 50%)` |
| `disabled:opacity-50`                     | `:disabled { opacity: .5 }`                                      |
| `aria-invalid:*`                          | `[aria-invalid="true"], [data-invalid]`                          |
| `dark:*`                                  | the dark block in 4.6                                            |
| `has-[…]:` / `group-has-[…]/x:`           | `:has(…)` on the container                                       |
| `*:rounded-none`                          | `> *` child rule                                                 |
| `in-data-[slot=x]:` / `group-data-[…]/x:` | ancestor selector (`[data-slot="x"] .np-y`), plus a class hook   |
| `peer-*`                                  | sibling combinator (`~`), noting the peer must come first        |
| `animate-pulse` etc.                      | a named `@keyframes np-<name>-<effect>`                          |
| `@container` / `@md/…:`                   | `container: name / inline-size` and `@container name (min-width: 28rem)` |
| `size-4` on `svg:not([class*='size-'])`   | `svg:not([class*="size-"])` with a size variable                 |

Keep what Tailwind gave for free: a `<button>` reset, `margin: 0` on `dl`/`dd`/`p`, `border: 0` on fieldsets, `box-sizing: border-box`.

---

## 10. Cross-component rules

- **Reuse, don't duplicate.** A part that is a Button is a Button (`InputGroupButton` renders `Button` and adds `np-input-group-button`). A divider is the Separator component. Label is the Label component.
- **A container that restyles another nepui component's border/radius** (button group, input group) does so from its own stylesheet with a scoping selector, never by editing the child's CSS file.
- When two components must agree (heights, radius, focus ring, invalid look), copy the existing values from the table in 4.7 and 4.5.
- Do not change an existing component's public hooks or defaults without being asked. If a new component needs a tweak in another file, point it out instead of silently editing.

---

## 11. Existing components (reference)

| Component    | Hooks (class / data)                                                                    | Notes |
| ------------ | --------------------------------------------------------------------------------------- | ----- |
| Button       | `np-button` · `data-variant` `data-size` · `np-button-{outline,secondary,ghost,destructive,link,xs,sm,lg,icon,icon-xs,icon-sm,icon-lg,rounded}` | Base UI Button, `cva` |
| Input        | `np-input` · `np-input-{xs,sm,lg}` · `data-size`                                        | Base UI Input, native `size` omitted |
| Textarea     | `np-textarea` · `--np-textarea-min-height`                                              | plain `<textarea>`, `field-sizing: content` |
| Label        | `np-label` · `data-np-label`                                                            | disabled via ancestor `[data-disabled="true"]` or preceding disabled control |
| Checkbox     | `np-checkbox` · `data-np-checkbox` · `np-checkbox-indicator`                            | React uses Base UI root + inline SVG; HTML uses native `<input>` with a mask |
| Separator    | `np-separator` · `np-separator-vertical` · `data-orientation`                           | Base UI Separator, `--np-separator-color/size` |
| Badge        | `np-badge` · `data-variant` `data-appearance` `data-size` `data-radius` `data-dot` `data-pulse` · `np-badge-custom` | variants: default, secondary, info, success, warning, destructive; appearance: solid, light, outline; `color` prop = any CSS color via `--np-badge-color` |
| Skeleton     | `np-skeleton` · `np-skeleton-circle` · `data-shape="circle"`                            | pulse animation, `aria-hidden` |
| Kbd          | `np-kbd` · `np-kbd-group`                                                               | `KbdGroup` renders a `<kbd>` |
| Button Group | `np-button-group` · `np-button-group-vertical` · `np-button-group-text`                 | dividers use `np-separator` as a direct child |
| Field        | `np-field-{set,legend,group,content,label,title,description,separator,error}` · `np-field` + `-horizontal/-responsive` | `FieldGroup` is a container (`28rem` breakpoint); choice cards via label `:has` |
| Input Group  | `np-input-group` · `-addon` (`-end/-block-start/-block-end`) · `-text` · `-button` · `-input` · `-textarea` | group draws border/ring/invalid; control has none |
| Steps        | `np-steps` · `np-step`                                                                  | CSS counter; direct `h3` children are numbered |

---

## 12. Pitfalls that already cost time

1. **Variables on `:root` are shadowed** by the base rule → put them on the element (4.2).
2. **`.np-x[data-…]` selectors** break the data-only form → always `:is(.np-x, [data-np-x])[data-…]`.
3. **`:has()` specificity** can make a focus rule beat an invalid rule → `:where()` and order (4.4).
4. **A group that restyles a child's border** needs selectors that include the child's state variants.
5. **Tailwind `-foreground` tokens mean "text on that color"** (often white). Do not use them as text colors on tinted backgrounds; derive text from the color itself: `color-mix(in oklch, var(--np-success), var(--np-foreground) 40%)`.
6. **Custom property in a keyframe/`color-mix` with `currentColor`** works; keep the property on the element so `var()` resolves.
7. **Non-table pipes** in MDX tables must be escaped (`\|`).
8. **`display: contents` wrappers** hurt accessibility; use `Fragment` in React.
9. **`<div>` inside `<label>`** is invalid HTML; use `<span>` (choice cards).
10. **Browser support:** `field-sizing`, container queries, `:has`, relative colors (`oklch(from …)`) are modern CSS. Provide a sane fallback or say so in the docs.
11. **iOS zoom:** inputs must be `1rem` on small screens.
12. **Do not drop `aria-*` or `role`** when simplifying markup.

---

## 13. Reply format when you finish a component

Keep the reply short. Present all files, then say in a few lines:

- what was built and where,
- how it differs from the shadcn source (and why),
- which tokens / dependencies it needs,
- anything you could not verify (nothing is rendered or type-checked unless you actually ran it),
- which demo names the docs reference.

Do not claim you tested rendering. Say what you checked (brace balance, grep) and what you did not.
