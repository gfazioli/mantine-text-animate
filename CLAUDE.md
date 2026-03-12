# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@gfazioli/mantine-text-animate` (v3.1.0) is a Mantine UI extension providing text animation components. The main `TextAnimate` component uses CSS keyframe animations with entry/exit states, controllable by character/word/line granularity. Nine compound components are attached as static properties:

- **TextAnimate** — CSS animation (fade, blur, scale, slide variants) with `animate` direction control (incl. `'loop'` mode), `trigger` mode (`mount`/`inView`/`manual`), `onAnimationComplete` callback; hook: `useTextAnimate`
- **TextAnimate.Typewriter** — Character-by-character typing with cursor, blink, loop, multiline, `onCharType` callback, `pauseAt` pauses, `withSound` Web Audio; hook: `useTypewriter`
- **TextAnimate.Spinner** — Circular spinning text with radius, speed, direction control; accepts `string | ReactNode[]`
- **TextAnimate.NumberTicker** — Animated number counter with easing, `prefix`/`suffix`, `formatValue` custom formatter; hook: `useNumberTicker`
- **TextAnimate.TextTicker** — Random-to-target character reveal with direction control; hook: `useTextTicker`
- **TextAnimate.Gradient** — Animated gradient text via `background-clip: text` with configurable colors, speed, direction
- **TextAnimate.Highlight** — Animated highlighter marker effect (CSS-only, no hook)
- **TextAnimate.Scramble** — Hacker/decryption effect with per-character random cycling; hook: `useScramble`
- **TextAnimate.SplitFlap** — Airport departure board (Solari board) 3D flip display; hook: `useSplitFlap`
- **TextAnimate.Morphing** — Fluid text transitions using LCS algorithm; hook: `useMorphing`

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
TextAnimate.test.tsx       — Tests (42 tests across 5 suites)
TextAnimate.story.tsx      — Storybook stories
use-text-animate.ts        — Hook (useTextAnimate: animate/setAnimate/replay/isAnimating/key)
├── Typewriter/
│   ├── Typewriter.tsx     — Component (polymorphicFactory, cursor/blink via CSS)
│   ├── use-typewriter.ts  — Hook (setTimeout-based typing loop, onCharType, pauseAt)
│   └── Typewriter.story.tsx
├── Spinner/
│   ├── Spinner.tsx        — Component (polymorphicFactory, string | ReactNode[] children)
│   ├── Spinner.module.css — spin-clockwise/counterclockwise keyframes
│   └── Spinner.story.tsx
├── NumberTicker/
│   ├── NumberTicker.tsx   — Component (polymorphicFactory, prefix/suffix, formatValue)
│   ├── use-number-ticker.ts — Hook (requestAnimationFrame, 4 easing functions, Intl.NumberFormat/formatValue)
│   └── NumberTicker.story.tsx
├── TextTicker/
│   ├── TextTicker.tsx     — Component (polymorphicFactory, monospace font)
│   ├── use-text-ticker.ts — Hook (rAF, Fisher-Yates shuffle, 4 reveal directions)
│   └── TextTicker.story.tsx
├── Gradient/
│   ├── Gradient.tsx        — Component (polymorphicFactory, background-clip: text)
│   └── Gradient.module.css — gradient-shift keyframe
├── Highlight/
│   ├── Highlight.tsx       — Component (polymorphicFactory, CSS-only highlight marker)
│   └── Highlight.module.css — highlight-sweep keyframe
├── Scramble/
│   ├── Scramble.tsx        — Component (polymorphicFactory, monospace font)
│   ├── use-scramble.ts     — Hook (rAF, per-char stagger, 4 reveal directions)
│   └── Scramble.module.css
├── SplitFlap/
│   ├── SplitFlap.tsx       — Component (polymorphicFactory, 3D flip per character)
│   ├── use-split-flap.ts   — Hook (setTimeout chain, cycles through characterSet)
│   └── SplitFlap.module.css — flip-top/flip-bottom keyframes, perspective 3D
└── Morphing/
    ├── Morphing.tsx        — Component (polymorphicFactory, monospace, absolute positioning)
    ├── use-morphing.ts     — Hook (LCS algorithm, character state tracking)
    └── Morphing.module.css — morph-enter/morph-exit keyframes
```

### Mantine Styles API Pattern (all components)

Every component follows: `polymorphicFactory` → `useProps('ComponentName', defaults, props)` → `useStyles` → `createVarsResolver` for CSS variables.

### Docs (`docs/`)

- `docs/pages/` — MDX pages
- `docs/demos/` — 34 interactive demo components (configurators, hooks, events, styles, trigger, gradient, highlight, scramble, split-flap, morphing)
- `docs/styles-api/` — Styles API definitions for all 10 components
- `docs/components/` — Shell, Footer, Logo
- `docs/docgen.json` — Auto-generated prop docs

### Build Pipeline

Rollup → ESM (`.mjs`) + CJS (`.cjs`). CSS modules hashed via `hash-css-selector` (prefix `me`). Non-index chunks get `'use client'` banner.

## Test Coverage

**42 tests** across 5 suites covering components (TextAnimate, Typewriter, Spinner, NumberTicker, TextTicker). Tests cover: render, props behavior, ARIA attributes, data attributes, animation direction, text splitting, trigger modes, prefix/suffix, ReactNode children. `jsdom.mocks.cjs` includes `requestAnimationFrame` mock for ticker hooks.

## Conventions

- Package manager: **yarn v4** (never npm/pnpm)
- All components use Mantine's Styles API pattern (factory, `useProps`, `useStyles`, `varsResolver`)
- CSS modules: `.module.css` extension; CSS variables prefixed `--text-animate-`
- Tests: Jest + `@testing-library/react` + `@mantine-tests/core`; files: `*.test.tsx`
- Stories: Storybook; files: `*.story.tsx`
- If `prettier:check` fails on `Footer.tsx`/`Shell.tsx`, run `yarn prettier:write` first
- Commits: `diny yolo` (AI-assisted, stages all, auto-generates message, commits + pushes)
