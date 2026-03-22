# Phase 1: Design System and Component Library - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the TanStack Start project with Cloudflare Workers support, configure the full Neon Monolith design token system in Tailwind CSS v4, build all reusable UI components (GlitchText, NeonButton, HexCard, MetricDisplay, TierBadge, StatusIndicator, ProgressBar, TokenInput, TerminalLog), and implement animation hooks (useGlitch, useTypewriter, useCountUp) with shared Framer Motion variants. The root layout (Shell, Header, Footer, ScanlineOverlay) must be functional with navigation to all 5 routes.

</domain>

<decisions>
## Implementation Decisions

### Component Architecture
- Props-first API with `className` passthrough — each component accepts typed props + optional `className` for overrides via `cn()` (clsx+twMerge)
- One file per component — `GlitchText.tsx`, `NeonButton.tsx` etc. in `components/ui/` with co-located types
- Use CVA (class-variance-authority) for type-safe variant maps on components with multiple variants
- Build components directly in routes — no Storybook, test by composing into actual screen layouts

### Design Token Implementation
- CSS custom properties in Tailwind v4 `@theme` — define all colors/spacing as CSS vars in `app.css` using `@theme { --color-surface: #060e20; }` syntax
- Surface shift utilities for "no 1px borders" — create `bg-surface-container`, `bg-surface-container-high` etc. and use adjacent surface tones for visual boundaries
- Self-hosted woff2 fonts in `public/fonts/` — load via `@font-face` in CSS, no external CDN calls
- Neon glow effects via Tailwind `shadow-*` utilities + custom CSS — define glow shadows as design tokens (`--shadow-neon-cyan`, `--shadow-neon-magenta`), use `box-shadow` for ambient glows

### Animation Implementation
- Glitch effect is pure CSS with `.glitch` utility class — clip-path + text-shadow color channel shift keyframes, no JS
- useCountUp uses requestAnimationFrame with easeOutExpo — `useCountUp(target, duration)` returns animated value
- Scanline overlay is a fixed-position CSS pseudo-element on body — repeating linear gradient, zero JS, always visible
- All shared motion variants in single `components/animations/variants.ts` file per DESIGN.md spec

### Claude's Discretion
No items deferred to Claude's discretion — all questions answered.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing code — greenfield project
- 5 Stitch screen designs available as reference (`screen.png` + `code.html` in each directory)
- DESIGN.md contains complete color tokens, directory structure, animation variants, and DB schema

### Established Patterns
- No established patterns yet — this phase establishes them
- DESIGN.md specifies: TanStack Start, Tailwind v4, Framer Motion, Zod, clsx + tailwind-merge

### Integration Points
- Root layout (`__root.tsx`) wraps all routes with Shell, Header, Footer, ScanlineOverlay
- TanStack Router configured with 5 routes: `/`, `/ranking`, `/valuation/$assetId`, `/what-if`, `/terminal`
- `wrangler.jsonc` binds AI, D1, KV, R2 for Cloudflare Workers

</code_context>

<specifics>
## Specific Ideas

- Pixel-perfect match to Stitch screen designs is non-negotiable — reference `screen.png` files
- Neon Monolith color tokens are fully specified in DESIGN.md (all surface variants, primary/secondary/tertiary with containers)
- Header nav uses "TACTICAL ARCANA" branding with route links: Protocol Active, Network Latent, Value Matrix, What If Lab, Terminal
- DESIGN.md specifies exact animation variants code (fadeInUp, staggerContainer, scaleIn, pulseGlow)
- No 1px borders anywhere — tonal surface shifts only

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
