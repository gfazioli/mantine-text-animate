# CLAUDE.md

## Project
`@gfazioli/mantine-text-animate` is a Mantine UI extension providing text animation components. The main `TextAnimate` component uses CSS keyframe animations with entry/exit states, controllable by character/word/line granularity, plus ten compound sub-components for typewriter, spinner, number ticker, gradient, morphing, and more.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn jest --testPathPattern=TextAnimate` | Run a single test file |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint + Stylelint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn typecheck` | TypeScript check (root + docs) |
| `yarn storybook` | Start Storybook dev server (port 8271) |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API (props, types, exports), always run `yarn clean && yarn build` before `yarn test`, because `yarn docgen` needs the fresh build output.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

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
├── SplitFlap/
│   ├── SplitFlap.tsx       — Component (polymorphicFactory, 3D flip per character)
│   ├── use-split-flap.ts   — Hook (setTimeout chain, cycles through characterSet)
│   └── SplitFlap.module.css — flip-top/flip-bottom keyframes, perspective 3D
├── Morphing/
│   ├── Morphing.tsx        — Component (polymorphicFactory, monospace, absolute positioning)
│   ├── use-morphing.ts     — Hook (LCS algorithm, character state tracking)
│   └── Morphing.module.css — morph-enter/morph-exit keyframes
└── RotatingText/
    ├── RotatingText.tsx        — Component (polymorphicFactory, inline text carousel)
    ├── use-rotating-text.ts    — Hook (interval timer, transition state machine)
    └── RotatingText.module.css — rotate-in/out keyframes (slide, fade, blur variants)
```

### Build Pipeline
Rollup bundles to dual ESM (`.mjs`) and CJS (`.cjs`) with `'use client'` banner. CSS modules are hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS is split into `styles.css` and `styles.layer.css` (layered version).

### Docs (`docs/`)
- `docs/pages/` — MDX pages
- `docs/demos/` — 32 interactive demo components (configurators, hooks, events, styles, trigger, gradient, highlight, split-flap, morphing)
- `docs/styles-api/` — Styles API definitions for all 10 components
- `docs/docgen.json` — Auto-generated prop docs

## Component Details

### Sub-Components (10 compound components on `TextAnimate.*`)

- **TextAnimate** — CSS animation (fade, blur, scale, slide variants) with `animate` direction control (incl. `'loop'` mode), `trigger` mode (`mount`/`inView`/`manual`), `onAnimationComplete` callback; hook: `useTextAnimate`
- **TextAnimate.Typewriter** — Character-by-character typing with cursor, blink, loop, multiline, `onCharType` callback, `pauseAt` pauses, `withSound` Web Audio; hook: `useTypewriter`
- **TextAnimate.Spinner** — Circular spinning text with radius, speed, direction control; accepts `string | ReactNode[]`
- **TextAnimate.NumberTicker** — Animated number counter with easing, `prefix`/`suffix`, `formatValue` custom formatter; hook: `useNumberTicker`
- **TextAnimate.TextTicker** — Random-to-target character reveal with direction control, optional scramble mode (`scrambleDuration`/`staggerDelay`); hook: `useTextTicker`
- **TextAnimate.Gradient** — Animated gradient text via `background-clip: text` with configurable colors, speed, direction
- **TextAnimate.Highlight** — Animated highlighter marker effect (CSS-only, no hook)
- **TextAnimate.SplitFlap** — Airport departure board (Solari board) 3D flip display; hook: `useSplitFlap`
- **TextAnimate.Morphing** — Fluid text transitions using LCS (Longest Common Subsequence) algorithm for character state tracking; hook: `useMorphing`
- **TextAnimate.RotatingText** — Animated text carousel cycling through strings with slide/fade/blur transitions; hook: `useRotatingText`

### Mantine Styles API Pattern
All components follow: `polymorphicFactory` → `useProps('ComponentName', defaults, props)` → `useStyles` → `createVarsResolver` for CSS variables. CSS variables are prefixed `--text-animate-`.

### Hooks
| Hook | Mechanism |
|------|-----------|
| `useTextAnimate` | animate/setAnimate/replay/isAnimating/key state |
| `useTypewriter` | setTimeout-based typing loop with onCharType, pauseAt |
| `useNumberTicker` | requestAnimationFrame with 4 easing functions, Intl.NumberFormat |
| `useTextTicker` | requestAnimationFrame, Fisher-Yates shuffle, 4 reveal directions |
| `useSplitFlap` | setTimeout chain, cycles through characterSet |
| `useMorphing` | LCS algorithm, character state tracking |
| `useRotatingText` | Interval timer, transition state machine |

## Testing
Jest with `jsdom` environment, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Component tests use `@mantine-tests/core` render helper. `jsdom.mocks.cjs` includes `requestAnimationFrame` mock for ticker hooks.

**42 tests** across 5 suites covering components (TextAnimate, Typewriter, Spinner, NumberTicker, TextTicker). Tests cover: render, props behavior, ARIA attributes, data attributes, animation direction, text splitting, trigger modes, prefix/suffix, ReactNode children.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code → test → build → docs → release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
