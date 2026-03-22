# Phase 2: Primary Valuation Pipeline - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the complete input-to-result valuation flow: the Entry screen (Screen 1) where users submit asset descriptions, the D1/KV/AI backend infrastructure that stores and valuates assets, and the Tactical Reveal screen (Screen 3) that displays AI-powered valuation results. Both screens must pixel-perfectly match their Stitch reference designs.

</domain>

<decisions>
## Implementation Decisions

### Entry Screen Layout
- System metrics cards use hardcoded impressive values (84.2 T-FLOPS, 1.4M ARC, +2.4%, 12ms) — no real backend data needed for portfolio demo
- Form submission redirects to `/valuation/$assetId` — stores in D1, triggers AI, then navigates to reveal page
- Category selection uses segmented control — 5 categories (collectible, art, tech, luxury, other) as tactical-styled toggle buttons
- Background watermark "ENTRY_PRTCL" uses CSS with absolute-positioned text at ~5% opacity using on-surface-variant color

### AI Valuation Pipeline
- Structured JSON prompt with tactical framing — system prompt asks model to roleplay as "ARCANA valuation engine", returns JSON with value/projection/confidence/tier/density, based on reasonable logic
- On AI response parse failure, fallback to deterministic mock data generated from input hash — UI always has data to display
- KV cache key: `valuation:${sha256(description+category)}` for deterministic cache hits on identical inputs
- AI engine metrics on Reveal screen are theatrical with plausible numbers — confidence scores derived from actual AI response, not multiple real models

### Tactical Reveal Screen
- Asset images use placeholder/generic tactical-looking images per category stored in public/ — no user upload or AI generation
- AI prompt returns both current value and projected value — growth rate computed client-side as percentage difference
- Multiplier Effect category cards have static descriptions but dynamic relevance scores from AI response
- Breadcrumb navigation uses tactical path format: `PROTOCOL_TRACE > SECTOR_01 > CONTAINMENT_UNIT`

### Claude's Discretion
No items deferred to Claude's discretion — all questions answered.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- All UI components from Phase 1: GlitchText, NeonButton, HexCard, MetricDisplay, TierBadge, StatusIndicator, ProgressBar, TokenInput, TerminalLog
- Animation hooks: useCountUp, useTypewriter, useGlitch
- Shared variants: fadeInUp, staggerContainer, scaleIn, pulseGlow
- Layout: Shell, Header, Footer, ScanlineOverlay
- Utility: cn() for class merging
- All 5 routes already exist as placeholder pages

### Established Patterns
- CVA (class-variance-authority) for component variants
- Tailwind v4 with CSS custom properties (@theme tokens)
- No 1px borders — tonal surface shifts only
- Space Grotesk for headlines, Inter for body
- Framer Motion for interactive animations, CSS for persistent effects

### Integration Points
- src/routes/index.tsx — Entry screen (currently placeholder, needs full build)
- src/routes/valuation.$assetId.tsx — Reveal screen (currently placeholder, needs full build)
- wrangler.jsonc already has AI, D1, KV, R2 bindings configured
- Server functions go in src/core/functions/ and src/core/server/

</code_context>

<specifics>
## Specific Ideas

- Pixel-perfect match to Stitch screen designs is non-negotiable — reference screen.png files in tactical_entry_protocol_animated/ and tactical_reveal_animated/
- The Entry screen has the code.html reference in tactical_entry_protocol_animated/code.html
- The Reveal screen has the code.html reference in tactical_reveal_animated/code.html
- DESIGN.md specifies exact D1 schema (valuations table), server function patterns, and AI Gateway architecture
- AI model: @cf/meta/llama-3.1-8b-instruct-fast (primary), @cf/mistral/mistral-7b-instruct-v0.2 (fallback)
- AI Gateway ID: token-for-granted-gateway
- The Reveal screen shows a Pokemon card (Charizard) in the Stitch design — use generic placeholder images per category instead

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
