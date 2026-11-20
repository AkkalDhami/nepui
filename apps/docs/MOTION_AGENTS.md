# nepui Motion: agent guide

Use this guide when you generate a **Motion** component for nepui. It covers five categories:

1. Text Effects
2. Backgrounds
3. Transitions
4. Loaders and Spinners
5. Animated Components

Read the shared rules first. Then read the section for your category. Every component ships for **React** and **plain HTML**.

**tokens.css**

```css
/* nepui — design tokens */

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

  --np-primary: #000000;
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
  --np-primary-foreground: #000000;

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

    --np-primary: #ffffff;
    --np-primary-foreground: #000000;

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

## 1. Non-negotiables

1. **CSS only.** No motion library, no canvas, no WebGL. Use `@keyframes`, `transition`, `@starting-style`, `animation-timeline` and CSS variables. Add JS only where CSS cannot do the job, and make the JS optional (see section 6).
2. **One prefix.** Every class starts with `np-`. Every hook has a class and a `data-np-*` alias, so `.np-aurora` and `[data-np-aurora]` both work. Write selectors as `:is(.np-x, [data-np-x])`.
3. **Config goes in `data-*` attributes, never in inline `style`.** A choice such as a gradient, speed or mask is an attribute in HTML and a prop in React. Demos must not set CSS variables in `style` to pick colors or durations. A name like `data-gradient="ocean"` is the way.
4. **Tokens only.** Use colors and sizes from `tokens.css` (`--np-background`, `--np-foreground`, `--np-muted-foreground`, `--np-border`, `--np-primary`, `--np-ring`, `--np-radius-*`, `--np-shadow-*`). Do not invent a token. A decorative palette (gradient stops, neon glow) may use `oklch()` literals, declared once as component variables.
5. **Dark mode comes from the tokens.** Do not write a `.dark` rule. Mix with `var(--np-background)` where an effect has to blend.
6. **Logical properties** (`inset-inline-start`, `padding-block`) wherever the direction can change. Physical `left`/`top` is allowed only where the effect is a coordinate (a thumb, a gradient angle, a translate).
7. **No `!important`.**
8. **Reduced motion is mandatory.** Every animation stops under `@media (prefers-reduced-motion: reduce)`. The content stays visible and readable. A loader keeps a non-moving indicator or a slow fade.
9. **Comments.** A CSS or JS file has exactly one comment, the first line: `/* nepui — <Name> */`. No other comments. JSDoc on React props is allowed.
10. **Variables are named `--np-<component>-<property>`**, for example `--np-aurora-duration`. They are declared on the root element of the component.
11. **No `any`** in TypeScript. No `forwardRef`. React 19, `"use client"`, `React.ComponentProps<"tag">`, `cn` from `"cn"`.
12. **Do not edit a base component.** Motion for an existing component lives in its own file (see section 7.5).

---

## 2. Sidebar and naming

```text
Getting Started
Components
Motion
├── Text Effects
├── Backgrounds
├── Transitions
├── Loaders
└── Animated Components
```

- **Labels:** Title Case, singular, named for what the thing is: "Typewriter", "Aurora", "Fade", "Spinner". Never "Animated Typewriter" or "Typewriter Animation". The group already says it is motion.
- **Slugs and files:** kebab-case, equal to the label: `text-reveal`, `border-beam`, `dots-loader`.
- **Classes:** `np-<slug>` for the root, `np-<slug>-<part>` for a part.
- **Variants** are attributes, not extra classes: `data-gradient`, `data-speed`, `data-size`, `data-variant`.
- **Animated Components** keep the base slug and add a suffix on the file only: `dialog.motion.css`.

---

## 3. Files for each component

```text
<slug>/
├── <slug>.css              /* nepui — <Name> */
├── <slug>.tsx              React flavour
├── index.ts                exports
├── <slug>.html              every HTML demo on one page, with a dark toggle
├── <slug>.mdx              React docs
├── <slug>-html.mdx         HTML docs
├── <slug>.js               only if CSS cannot do it (optional, IIFE)
└── demos/
    ├── <slug>-<demo>.tsx
    └── html/<slug>-<demo>.html
```

- Both flavours share one stylesheet. If a rule is only for React, say so in the docs rather than forking the file.
- Every component needs at least **4 demos per flavour**, always named the same in both: `demo` first, then the options (`gradients`, `speeds`, `masks`, `sizes`, and so on).
- A demo may use other nepui components. In the HTML docs, list their stylesheets in `styles={[...]}`.

---

## 4. One vocabulary for options

Use these names and values in every component. Do not invent a synonym.

| Option | React prop | HTML attribute | Values |
| --- | --- | --- | --- |
| Gradient | `gradient` | `data-gradient` | `aurora`, `sunrise`, `sunset`, `ocean`, `forest`, `fire`, `candy`, `lavender`, `mint`, `peach`, `midnight`, `gold`, `rainbow`, `cyber`, `plasma`, `mono` |
| Speed | `speed` | `data-speed` | `slow`, `default`, `fast` |
| Still | `animated={false}` | `data-animate="false"` | |
| Direction | `reverse` | `data-direction="reverse"` | |
| Strength | `intensity` | `data-intensity` | `subtle`, `default`, `strong` |
| Glow | `neon` | `data-neon` | `soft`, `default`, `strong` |
| Size | `size` | `data-size` | `sm`, `md`, `lg` |
| Replace element | `render` | | A React element |

- The **default** of a prop is the unmarked state. React omits the attribute when the value is the default (`gradient === "sunrise"` writes no `data-gradient`).
- The 16 gradient names are fixed. Each is five `oklch()` stops. Keep the table identical in every component that takes `gradient`. A component declares the stops under its own variable name, for example `--np-gradient-text-1` to `-5` or `--np-aurora-color-1` to `-5`.
- To extend, document a user rule such as `[data-gradient="brand"] { --np-<component>-1: ... }` in a section named "Your own gradient".
- Speed maps to a duration variable: `--np-<component>-duration`. `slow` is double the default and `fast` is half.
- Export `gradientNames` as a `const` array from the React file when the component accepts `gradient`.

---

## 5. React conventions

- One function per part. Props type is `Omit<React.ComponentProps<"tag">, ...> & { ... }`.
- Put data attributes on the element through one `merged` object, then spread `...props` after your own attributes so the user can override them.
- Support `render` through `React.cloneElement`, merging `className` and `style`.
- Every element gets `data-slot="<slug>"` (and `data-slot="<slug>-<part>"` for parts).
- Import `../tokens.css` and `./<slug>.css`, with this line above the imports: `// NOTE: Update these paths if needed`.
- Do not set state inside an effect. Use `useSyncExternalStore` or derive from props.
- Do not read or write `ref.current` during render.

---

## 6. HTML and optional JS

- Prefer zero JS. The stylesheet alone must produce the full effect.
- If JS is unavoidable, ship `<slug>.js` as an IIFE exposing `window.Nepui<Name> = { init, initAll, get }`. Configure it through `data-*` attributes. Auto-initialise on `DOMContentLoaded`. Dispatch cancelable `np-<slug>-<event>` CustomEvents where a change can be refused. Document every attribute, class, method and event in a Reference section.
- JS is for things such as splitting text into spans, observing intersection, or toggling a state class. Never for per-frame animation.

---

## 7. Categories

### 7.1 Text Effects

**What belongs:** Typewriter, Text Reveal, Split Text, Word Rotate, Gradient Text, Shimmer Text, Wave Text, Underline Draw, Highlight, Count Up.

**How:**
- The text stays real text. Never replace it with an image or canvas, so it is selectable, translatable and read by a screen reader.
- Clip a background to the glyphs with `background-clip: text` and `-webkit-text-fill-color: transparent`. Give the element `width: fit-content; max-width: 100%` so a gradient spans the text, not the box.
- Loop a gradient seamlessly: repeat the first stop at the end, set `background-size: 200% 100%`, and animate `background-position` to `200% 50%`.
- Glow with `filter: drop-shadow()`. Do not use `text-shadow` on clipped text, because it shows through the glyphs.
- Per-letter or per-word effects need a split. Do the split in React by mapping children, and in HTML with a tiny optional script that wraps characters in `<span style="--i: n">`-free markup using `:nth-child()` or `sibling-index()` where supported. Add `aria-label` with the full text on the parent and `aria-hidden="true"` on the pieces.
- A counting effect uses `@property` with `counter()` so it stays CSS. Provide the final number as real text for assistive technology.

**Required options:** `gradient` where color applies, `speed`, `animated`, and `neon` / `flicker` where glow makes sense.

**Required demos:** `demo`, an options grid (`gradients`, `variants`), `speeds`, `inline` (inside a sentence).

**Do not:** animate layout properties, hide text from assistive technology, or depend on a font.

### 7.2 Backgrounds

**What belongs:** Aurora, Grid, Dot Pattern, Meteors, Spotlight, Gradient Mesh, Noise, Waves.

**How:**
- The root is a box: `position: relative; isolation: isolate; overflow: hidden`. The effect is a `::before` or `::after` with `z-index: -1` and `pointer-events: none`, so children need no styling and no extra markup.
- Blend with `var(--np-background)`, so light and dark both work.
- Animate `background-position`, `transform` or `opacity` only. Declare `will-change` for the property you animate.
- Provide a `mask` option (`corner`, `center`, `top`, `bottom`, `none`) built from `mask-image`. Keep the five names.
- Keep it cheap. One blurred layer per box. Warn in the docs about using many on one screen.

**Required options:** `gradient` (where colored), `mask`, `intensity`, `speed`, `animated`.

**Required demos (hero style):** `demo` is a hero section with a badge, a headline, a paragraph and two buttons. Then `gradients` (all 16), `cover` (full section, `mask="none"`, strong), `masks`, `intensity`.

**Do not:** add a canvas, a script, or fixed pixel sizes. Do not set the page background.

### 7.3 Transitions

**What belongs:** Fade, Slide, Zoom, Collapse, Blur, Stagger, Scroll Reveal.

**How:**
- These are helpers that other components reuse. Use `transition` with `@starting-style` for enter, and a `data-state` / `data-ending-style` hook for exit.
- Opt in with `data-transition="fade | slide-up | slide-down | slide-start | slide-end | zoom | blur"`. Use logical names (`start`, `end`), never `left` and `right`.
- Timing comes from shared variables: `--np-motion-duration` (default `200ms`), `--np-motion-ease` (default `cubic-bezier(0.22, 1, 0.36, 1)`), `--np-motion-delay`.
- **Stagger:** `data-stagger` on the parent delays each child using `sibling-index()` where available, with a `:nth-child()` fallback up to 12 children. State the limit in the docs.
- **Scroll Reveal:** use `animation-timeline: view()` and `animation-range`. Wrap it in `@supports (animation-timeline: view())` and show the content normally elsewhere.
- **Collapse:** animate `grid-template-rows: 0fr → 1fr`, not `height`.

**Required demos:** `demo`, one demo per transition kind, `stagger`, a `toggle` demo showing enter and exit.

**Do not:** leave content invisible when the feature is unsupported or motion is reduced. Under reduced motion, keep the opacity change and drop the movement.

### 7.4 Loaders and Spinners

**What belongs:** Spinner (ring, dual ring), Dots, Bars, Pulse, Orbit, Progress Indeterminate, Skeleton Shimmer.

**How:**
- The root is `role="status"` with an accessible name: `aria-label="Loading"`, or visible text. Add a visually hidden label when the visual is decorative.
- Draw with `currentColor`, so a spinner takes the color of its parent.
- Use `data-size="sm | md | lg"` bound to one variable: `--np-<slug>-size`.
- A variant is `data-variant`. Offer `data-gradient` only on loaders whose stroke can carry a gradient.
- Animate `transform` and `opacity`. A ring uses `border` plus a transparent segment, or `conic-gradient` with `mask`.
- Under reduced motion, slow it down (`animation-duration: 4s`) rather than stopping, so the user still sees activity. For a skeleton, stop the shimmer and keep the block.
- A button spinner shows inside the button through `data-loading` on the button. Do not edit the base Button. Ship it as `button.motion.css` (see 7.5).

**Required demos:** `demo`, `sizes`, `variants`, `colors` (inherits `currentColor`), `in-button`.

**Do not:** use a GIF or an image, or rely on color alone to show state.

### 7.5 Animated Components

**What it is:** the existing nepui components (Dialog, Sheet, Drawer, Tabs, Tooltip, Navigation Menu, Accordion, Carousel and others) with motion added. The base component is **never modified**.

**Files:** `<name>.motion.css` next to `<name>.css`. The docs page is "Animated <Name>" in the sidebar group, but the label stays `<Name>`.

**How:**
- Opt in through `data-motion="<preset>"` in HTML and a `motion` prop in React. The React wrapper only sets the attribute and imports the motion stylesheet. No new logic.
- Hook into the states the base component already exposes: `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-popup-open`, `data-state`, `[open]`. Never add JS timing.
- Use `transition` plus `@starting-style` for enter, and `[data-ending-style]` for exit. Respect `transition-behavior: allow-discrete` where `display` changes.
- Presets are short names built from the Transitions vocabulary: `fade`, `slide`, `zoom`, `spring`. Each one sets the shared `--np-motion-*` variables, nothing more.
- Tabs: animate the indicator with `anchor positioning` or a transform driven by existing variables. Carousel: animate with `scroll-snap` and `scroll-behavior`. Tooltip: fade plus a small translate away from the trigger side.

**Required per component:** a demo that shows the plain base next to the motion version, so the difference is visible. Name it `<name>-motion`.

**Do not:** change class names, markup or behaviour of the base component. A page that skips the motion file must look and work exactly as before.

---

## 8. Docs (`.mdx`)

Front matter, then sections in this order. Match the existing nepui docs.

```yaml
---
title: <Name>
description: <One sentence, plain words.>
contributor:
  - name: Akkal Dhami
    url: https://www.akkal.com.np
    avatar: https://github.com/akkaldhami.png
---
```

1. `<ComponentPreview name="<slug>-demo" />`. For HTML add `target="html"` and `styles={[...]} `scripts={[...]}`.
2. **Installation**, with `<ManualInstallation cli={...} manual={<Steps>...}>`.
3. **Usage.**
4. One section per option, each with its own preview: Gradients, Neon, Speed and direction, Mask, Sizes, and so on.
5. **Your own gradient**, when the component takes `gradient`.
7. **Accessibility**, and **Performance** when relevant.
8. **API Reference** (React) or **Reference** (HTML): props or attributes, classes and attributes table, script API if any.
9. **Credits**, only when the idea or code comes from a source. Give just the link. Leave the section out for original work.

Write plain sentences. Describe what the user sees and does.

---

## 9. Verify before you deliver

1. Open `index.html` in Chromium with Playwright. Confirm the animation runs: `getComputedStyle(el).animationName` is set (or `::before` for backgrounds). Capture zero page errors.
2. Take a screenshot in light and in dark and look at it. Check contrast of text on the effect.
3. Emulate `prefers-reduced-motion: reduce` and confirm nothing moves but the content is intact.
5. For React, at least run `ts.transpileModule` as a syntax check. Bundle and run it when the dependencies exist, and say plainly when you could not.
6. Check the files: one header comment only, no `!important`, no inline color variables in demos, no `any`, every `data-*` option in the table of section 4.
7. Organised the folder and deliver it.

---

## 10. Reply format

End with a short, honest note:

- what you built and where the options live;
- what differs from the source, if there was one;
- what you could not verify (real Base UI, Safari, Firefox, `animation-timeline` support);
- the demo names.

Do not recap your steps.