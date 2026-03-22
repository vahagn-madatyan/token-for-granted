# Roadmap: Token For Granted -- Tactical Arcana

## Overview

Transform 5 Stitch screen designs into a jaw-dropping Valorant-themed asset valuation dashboard on Cloudflare's full stack. The build progresses from design system foundation, through the primary AI valuation pipeline, to remaining screens, then production polish and deploy. Every phase delivers something visually verifiable against the Stitch reference designs.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System and Component Library** - Scaffold project, configure Neon Monolith tokens, build all reusable UI atoms and animation hooks
- [ ] **Phase 2: Primary Valuation Pipeline** - Build the Entry screen, database/AI backend, and Valuation Reveal screen for the complete input-to-result flow
- [ ] **Phase 3: Remaining Screens** - Build Value Matrix rankings, What If Lab with AI scenarios, and Tactical Terminal with boot sequence
- [ ] **Phase 4: Polish and Production Deploy** - Page transitions, responsive design, error handling, CI/CD, and live deployment

## Phase Details

### Phase 1: Design System and Component Library
**Goal**: The full Neon Monolith design system is operational and every reusable UI building block renders correctly with tactical styling, animations, and fonts
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06, UICM-01, UICM-02, UICM-03, UICM-04, UICM-05, UICM-06, UICM-07, UICM-08, UICM-09, UICM-10, UICM-11, UICM-12, UICM-13
**Success Criteria** (what must be TRUE):
  1. Running `pnpm dev` renders the app shell with Header navigation links to all 5 routes, Footer, and visible ScanlineOverlay effect
  2. Space Grotesk renders on headlines and Inter renders on body text throughout the shell
  3. Every UI component (GlitchText, NeonButton, HexCard, MetricDisplay, TierBadge, StatusIndicator, ProgressBar, TokenInput, TerminalLog) renders with correct Neon Monolith colors and tonal surface shifts (no 1px borders)
  4. Animation hooks work: GlitchText shows clip-path color channel shift, MetricDisplay counts up numbers, useTypewriter reveals text character-by-character
**Plans:** 4 plans

Plans:
- [x] 01-01-PLAN.md -- Scaffold TanStack Start project, Tailwind v4 with Neon Monolith tokens, fonts, CSS effects
- [x] 01-02-PLAN.md -- Root layout (Shell, Header, Footer, ScanlineOverlay), Router with 5 routes, animation hooks and variants
- [x] 01-03-PLAN.md -- Display UI components (GlitchText, NeonButton, HexCard, TierBadge, StatusIndicator)
- [x] 01-04-PLAN.md -- Data/interactive UI components (MetricDisplay, ProgressBar, TokenInput, TerminalLog)

### Phase 2: Primary Valuation Pipeline
**Goal**: A user can enter an asset description on the Entry screen, receive an AI-powered valuation, and view the full tactical reveal with projected values and confidence scores
**Depends on**: Phase 1
**Requirements**: ENT-01, ENT-02, ENT-03, ENT-04, ENT-05, ENT-06, ENT-07, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, AI-01, AI-02, AI-03, AI-04, AI-05, REV-01, REV-02, REV-03, REV-04, REV-05, REV-06, REV-07
**Success Criteria** (what must be TRUE):
  1. The Entry screen at `/` matches the Stitch design with system metrics cards showing count-up animations, AI Pulse status, system assets panel, and background watermark
  2. User can type an asset description, select a category, and press "INITIATE PROTOCOL" to submit -- the asset is stored in D1 and an AI valuation is generated via Workers AI
  3. After submission, the Valuation Reveal screen at `/valuation/$assetId` displays the asset card with current value, projected value, growth percentage, AI engine confidence scores, multiplier effect categories, and asset metadata
  4. AI responses are cached in KV with 1hr TTL so repeat lookups for the same asset are instant
  5. If the primary AI model fails, the system falls back to the Mistral model without user-visible errors
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Backend infrastructure: types, Zod schemas, D1 migration, DB/KV/AI server helpers, TanStack server functions
- [x] 02-02-PLAN.md -- Tactical Entry Protocol screen: system metrics, AI pulse, category selector, token input, form submission
- [x] 02-03-PLAN.md -- Tactical Reveal screen: asset card, value cards, AI engine metrics, multiplier effect, data loading

### Phase 3: Remaining Screens
**Goal**: All three remaining screens (Value Matrix, What If Lab, Tactical Terminal) are pixel-perfect and fully functional with AI-generated scenarios and animated terminal output
**Depends on**: Phase 2
**Requirements**: VAL-01, VAL-02, VAL-03, VAL-04, VAL-05, WIF-01, WIF-02, WIF-03, WIF-04, WIF-05, WIF-06, WIF-07, TRM-01, TRM-02, TRM-03, TRM-04, TRM-05, TRM-06, TRM-07, TRM-08
**Success Criteria** (what must be TRUE):
  1. The Value Matrix at `/ranking` displays all valuated assets organized into S/A/B/C tiers with color-coded badges, density score progress bars, and transformation logic metrics
  2. The What If Lab at `/what-if` shows 3 scenario cards (Shakespearean Loop, Repo Foundry, Infinite Debate) and pressing Play on any card triggers AI generation with typewriter text reveal animation
  3. The Tactical Terminal at `/terminal` plays a boot sequence animation on first visit, displays timestamped color-coded log entries, and shows system health, token latency, and node connection panels
  4. All three screens match their Stitch reference designs pixel-perfectly
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md -- Value Matrix screen with pre-seeded S/A/B/C tier cards, density scores, and Transformation Logic section
- [x] 03-02-PLAN.md -- What If Lab screen with Lab Parameters sidebar, 3 AI scenario cards with play triggers and typewriter output
- [x] 03-03-PLAN.md -- Tactical Terminal screen with boot sequence, command console, system monitoring panels, and sidebar navigation

### Phase 4: Polish and Production Deploy
**Goal**: The complete application is polished, responsive, handles errors gracefully, and is live on a shareable Cloudflare Workers URL with automated CI/CD
**Depends on**: Phase 3
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04, DEPL-05, DEPL-06, DEPL-07
**Success Criteria** (what must be TRUE):
  1. Navigating between any two screens shows smooth page transitions (fade + Y-translate via AnimatePresence)
  2. All 5 screens render correctly on desktop and tablet viewports with no broken layouts
  3. AI-powered interactions (valuation submission, scenario generation) show loading states while processing and display tactical-themed error messages if something fails
  4. Pushing to main on GitHub automatically triggers a CI/CD pipeline that typechecks, builds, and deploys to Cloudflare Workers
  5. The app is live at a `*.workers.dev` URL that can be shared publicly
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System and Component Library | 4/4 | Complete |  |
| 2. Primary Valuation Pipeline | 0/3 | Planned | - |
| 3. Remaining Screens | 0/3 | Not started | - |
| 4. Polish and Production Deploy | 0/2 | Not started | - |
