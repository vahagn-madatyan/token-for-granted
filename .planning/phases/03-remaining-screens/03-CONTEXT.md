# Phase 3: Remaining Screens - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the 3 remaining screens pixel-perfect to Stitch designs: Value Matrix (/ranking) with tier-ranked valuations, What If Lab (/what-if) with AI-powered scenario generation, and Tactical Terminal (/terminal) with boot sequence animation and live-feeling monitoring console.

</domain>

<decisions>
## Implementation Decisions

### Value Matrix (Screen 2)
- Pre-seed 4 showcase items (one per S/A/B/C tier) that always display, plus any real user-created valuations from D1
- Transformation Logic bar chart is theatrical with plausible static values — not computed from real data
- Stitch design shows real photos (coffee, Netflix logo, designer bag, Swiss watch) — use stock photos matching the reference for seeded items

### What If Lab (Screen 4)
- Lab Parameters sidebar is visual with interactive feel — neural_v06_v5 selector and token fuel allocator look interactive but don't change AI behavior (portfolio demo)
- Real AI calls with creative prompts for each scenario — unique system prompts producing different creative output, falls back to pre-written text if AI unavailable
- Active timebase/logic score counters use client-side useCountUp — numbers tick up smoothly on page load for live-feeling dashboard

### Tactical Terminal (Screen 5)
- Client-side generated boot sequence (~8 themed entries on mount) + pre-written ongoing logs — no real D1 terminal_logs queries
- Market metrics (token latency, valuation count, sentiment score) update every 2-3 seconds via client-side setInterval with small random deltas
- Command input is decorative with easter egg — typing and pressing Execute shows "COMMAND ACKNOWLEDGED. PROCESSING..." but doesn't do anything real
- Node connections match Stitch design exactly: Paris (HUB-01), Seoul (LINK-04), NYC (GATE-09), Tokyo (SATA-B), London (STR-02) with random online/syncing/offline cycling

### Claude's Discretion
No items deferred — all questions answered.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- All Phase 1 UI components: GlitchText, NeonButton, HexCard, MetricDisplay, TierBadge, StatusIndicator, ProgressBar, TokenInput, TerminalLog, ScanlineOverlay
- Animation hooks: useCountUp, useTypewriter, useGlitch
- Shared variants: fadeInUp, staggerContainer, scaleIn, pulseGlow
- Phase 2 backend: types.ts, schemas.ts, valuation.functions.ts, ai.server.ts, db.server.ts, cache.server.ts
- Phase 2 screen components: SystemMetrics, AIPulse, SystemAssets, CategorySelect, AssetCard, WhatIfPotential, AIEngineMetrics, MultiplierEffect

### Established Patterns
- Screen-specific composites go in src/components/screens/{screenName}/
- Routes use TanStack Router with loader functions for data fetching
- Server functions use TanStack Start's createServerFn pattern
- CVA for component variants, cn() for class merging
- Framer Motion for interactive animations, CSS for persistent effects

### Integration Points
- src/routes/ranking.tsx — Value Matrix (currently placeholder)
- src/routes/what-if.tsx — What If Lab (currently placeholder)
- src/routes/terminal.tsx — Terminal (currently placeholder)
- valuation.functions.ts has listValuations() for ranking data
- ai.server.ts has the AI call pattern to reuse for scenario generation
- src/core/functions/ for new server functions (scenarios)

</code_context>

<specifics>
## Specific Ideas

- Pixel-perfect match to Stitch screen designs — reference screen.png files in tactical_value_matrix_animated/, what_if_lab_animated/, tactical_terminal_animated/
- Each screen has code.html reference in its respective directory
- DESIGN.md specifies screen components and their hierarchy
- Value Matrix uses existing TierBadge and ProgressBar components
- What If Lab reuses the AI call pattern from ai.server.ts — just different prompts
- Terminal reuses TerminalLog component from Phase 1
- All 3 screens are independent — can be built in parallel

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
