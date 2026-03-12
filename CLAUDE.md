# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@gfazioli/mantine-text-animate` (v2.4.2) is a Mantine UI extension providing text animation components. The main `TextAnimate` component uses CSS keyframe animations with entry/exit states, controllable by character/word/line granularity. Four compound components are attached as static properties:

- **TextAnimate** — CSS animation (fade, blur, scale, slide variants) with `animate` direction control
- **TextAnimate.Typewriter** — Character-by-character typing with cursor, blink, loop, multiline; hook: `useTypewriter`
- **TextAnimate.Spinner** — Circular spinning text with radius, speed, direction control
- **TextAnimate.NumberTicker** — Animated number counter with easing; hook: `useNumberTicker`
- **TextAnimate.TextTicker** — Random-to-target character reveal with direction control; hook: `useTextTicker`

## Commands

| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup (output: `package/dist/`) |
| `yarn dev` | Start the Next.js docs dev server on port 9281 |
| `yarn test` | Full suite: syncpack → prettier → typecheck → lint → jest |
| `yarn jest` | Run only Jest tests |
| `yarn jest --testPathPattern=TextAnimate` | Run a single test file |
| `yarn docgen` | Generate component API docs (`docs/docgen.json`) |
| `yarn docs:build` | Build docs (runs docgen first) |
| `yarn docs:deploy` | Build + deploy docs to GitHub Pages |
| `yarn lint` | ESLint + Stylelint |
| `yarn prettier:write` | Auto-format all files |
| `yarn typecheck` | TypeScript check (root + docs) |
| `yarn clean` | Remove `package/dist/` |
| `yarn release:patch` | Bump patch version + deploy docs |
| `yarn storybook` | Start Storybook on port 8271 |

## Architecture

**Yarn workspaces** monorepo with two workspaces: `package/` (npm source) and `docs/` (Next.js site).

### Package Source (`package/src/`)

```
TextAnimate.tsx            — Main component (polymorphicFactory, CSS animations via data-* attributes)
TextAnimate.module.css     — 13 keyframe animations (fade, blur, scale, slide*, elastic, blur-up/down)
TextAnimate.test.tsx       — Tests (currently minimal)
TextAnimate.story.tsx      — Storybook stories
├── Typewriter/
│   ├── Typewriter.tsx     — Component (polymorphicFactory, cursor/blink via CSS)
│   ├── use-typewriter.ts  — Hook (setTimeout-based typing loop, supports string | string[])
│   └── Typewriter.story.tsx
├── Spinner/
│   ├── Spinner.tsx        — Component (polymorphicFactory, circular char positioning via transform)
│   ├── Spinner.module.css — spin-clockwise/counterclockwise keyframes
│   └── Spinner.story.tsx
├── NumberTicker/
│   ├── NumberTicker.tsx   — Component (polymorphicFactory)
│   ├── use-number-ticker.ts — Hook (requestAnimationFrame, 4 easing functions, Intl.NumberFormat)
│   └── NumberTicker.story.tsx
└── TextTicker/
    ├── TextTicker.tsx     — Component (polymorphicFactory, monospace font)
    ├── use-text-ticker.ts — Hook (rAF, Fisher-Yates shuffle, 4 reveal directions)
    └── TextTicker.story.tsx
```

### Mantine Styles API Pattern (all components)

Every component follows: `polymorphicFactory` → `useProps('ComponentName', defaults, props)` → `useStyles` → `createVarsResolver` for CSS variables.

### Docs (`docs/`)

- `docs/pages/` — MDX pages
- `docs/demos/` — 21 interactive demo components (configurators, hooks, events, styles)
- `docs/styles-api/` — Styles API definitions (TextAnimate, Typewriter, Spinner only — NumberTicker and TextTicker missing)
- `docs/components/` — Shell, Footer, Logo
- `docs/docgen.json` — Auto-generated prop docs

### Build Pipeline

Rollup → ESM (`.mjs`) + CJS (`.cjs`). CSS modules hashed via `hash-css-selector` (prefix `me`). Non-index chunks get `'use client'` banner.

## Known Issues (Audit 2026-03-11)

### Bugs

1. ~~**Typewriter `useProps` name mismatch**~~ — FIXED (2026-03-12)
2. ~~**TextAnimate key instability**~~ — FIXED (2026-03-12)
3. ~~**TextTicker stale displayText**~~ — FIXED (2026-03-12)
4. ~~**Typewriter memory leak risk**~~ — FIXED (2026-03-12)
5. ~~**TextTicker ignores value changes during animation**~~ — FIXED (2026-03-12)

### Missing Features

1. **No `prefers-reduced-motion` support** — All components ignore user motion preferences (CSS and JS)
2. **No ARIA attributes** — Animated content has no screen reader announcements
3. ~~**Missing Styles API docs**~~ — FIXED (2026-03-12)

### Test Coverage

Currently **1 test** (basic render check for TextAnimate). No tests exist for Typewriter, Spinner, NumberTicker, TextTicker, or any hooks. `jsdom.mocks.cjs` lacks `requestAnimationFrame` mock needed for ticker hooks.

### Demo Code Issues

Several demo code blocks have syntax errors that would fail if copy-pasted:
- Variable name mismatches (`started` vs `animated`) in TextAnimate.demo.events, NumberTicker.demo.configurator
- Incomplete imports in Typewriter.demo.hook, Typewriter.demo.events
- Invalid JSX syntax in Spinner.demo.configurator, NumberTicker.demo.configurator

## Conventions

- Package manager: **yarn v4** (never npm/pnpm)
- All components use Mantine's Styles API pattern (factory, `useProps`, `useStyles`, `varsResolver`)
- CSS modules: `.module.css` extension; CSS variables prefixed `--text-animate-`
- Tests: Jest + `@testing-library/react` + `@mantine-tests/core`; files: `*.test.tsx`
- Stories: Storybook; files: `*.story.tsx`
- If `prettier:check` fails on `Footer.tsx`/`Shell.tsx`, run `yarn prettier:write` first
- Commits: `diny yolo` (AI-assisted, stages all, auto-generates message, commits + pushes)
