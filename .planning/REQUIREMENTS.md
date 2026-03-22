# Requirements: Token For Granted -- Tactical Arcana

**Defined:** 2026-03-21
**Core Value:** Pixel-perfect recreation of Stitch screen designs with stunning Neon Monolith aesthetic -- visual impact is everything for this portfolio piece.

## v1 Requirements

### Foundation

- [x] **FOUN-01**: TanStack Start project scaffolded with Cloudflare Workers support
- [x] **FOUN-02**: Tailwind CSS v4 configured with full Neon Monolith design token system
- [x] **FOUN-03**: Space Grotesk and Inter fonts loaded and applied (headlines / body)
- [x] **FOUN-04**: Root layout with Shell, Header (nav links), Footer, and ScanlineOverlay
- [x] **FOUN-05**: TanStack Router configured with all 5 routes
- [x] **FOUN-06**: Vite config and wrangler.jsonc with Cloudflare bindings (AI, D1, KV, R2)

### UI Components

- [x] **UICM-01**: GlitchText component with CSS clip-path + color channel shift animation
- [x] **UICM-02**: NeonButton component with gradient CTA styling and ambient glow
- [x] **UICM-03**: HexCard component with tonal surface shifts (no 1px borders)
- [x] **UICM-04**: MetricDisplay component for system stats with animated count-up
- [x] **UICM-05**: TierBadge component (S/A/B/C) with color-coded styling
- [x] **UICM-06**: StatusIndicator component for connection/auth status
- [x] **UICM-07**: ProgressBar component with animated fill and density scores
- [x] **UICM-08**: TokenInput component for asset description entry
- [x] **UICM-09**: TerminalLog component with monospace timestamped entries
- [x] **UICM-10**: useGlitch hook for triggerable glitch effects
- [x] **UICM-11**: useTypewriter hook for character-by-character text reveal
- [x] **UICM-12**: useCountUp hook for animated number transitions via requestAnimationFrame
- [x] **UICM-13**: Shared Framer Motion variants (fadeInUp, staggerContainer, scaleIn, pulseGlow)

### Screen 1 -- Tactical Entry Protocol

- [x] **ENT-01**: Landing page at `/` matching Stitch design pixel-perfectly
- [x] **ENT-02**: System metrics cards (84.2 T-FLOPS, 1.4M ARC, +2.4%, 12ms) with count-up animation
- [x] **ENT-03**: Token input form with asset description field and category selection
- [x] **ENT-04**: AI Pulse status indicator showing "SYNCHRONIZED" state
- [x] **ENT-05**: "INITIATE PROTOCOL" submit button triggers valuation flow
- [x] **ENT-06**: System assets panel showing RARE_ASSET_1 and CORE_TOKEN status
- [x] **ENT-07**: Background watermark text "ENTRY_PRTCL" with reduced opacity

### Screen 2 -- Tactical Value Matrix

- [ ] **VAL-01**: Rankings page at `/ranking` matching Stitch design pixel-perfectly
- [ ] **VAL-02**: S/A/B/C tier cards showing valuated items with images, descriptions, density scores
- [ ] **VAL-03**: Animated progress bars per tier card showing density score
- [ ] **VAL-04**: Transformation Logic section with bar chart and conversion metrics
- [ ] **VAL-05**: Color-coded tier badges (S=cyan, A=magenta, B=lime, C=neutral)

### Screen 3 -- Tactical Reveal

- [x] **REV-01**: Valuation detail page at `/valuation/$assetId` matching Stitch design pixel-perfectly
- [x] **REV-02**: Asset Containment Unit header with breadcrumb navigation
- [x] **REV-03**: Asset card showing current value, projected value (growth %), and asset image
- [x] **REV-04**: "What If Potential Scale" progress bar with projected dollar value
- [x] **REV-05**: AI engine metrics section showing model confidence scores (GPT-4S, Claude 3.5, Llama 2.1)
- [x] **REV-06**: The Multiplier Effect section with category cards (Indie Games, Art Vaults, Narratives)
- [x] **REV-07**: Asset metadata (name, art edition, code identifier)

### Screen 4 -- What If Lab

- [ ] **WIF-01**: What If Lab page at `/what-if` matching Stitch design pixel-perfectly
- [ ] **WIF-02**: Lab Parameters sidebar with AI engine architecture selector and token fuel allocator
- [ ] **WIF-03**: 3 scenario cards: Shakespearean Loop (OMEGA), Repo Foundry (ALPHA), Infinite Debate (SIGMA)
- [ ] **WIF-04**: Play trigger button on each card triggers AI generation
- [ ] **WIF-05**: Typewriter text reveal animation for AI-generated scenario output
- [ ] **WIF-06**: "RUN SIMULATION" master button
- [ ] **WIF-07**: Active timebase and logic score counters in header

### Screen 5 -- Tactical Terminal

- [x] **TRM-01**: Terminal page at `/terminal` matching Stitch design pixel-perfectly
- [x] **TRM-02**: Command console with timestamped, color-coded log entries (INFO, WARNING, CRITICAL)
- [x] **TRM-03**: Boot sequence animation on first visit (sequential log appearance)
- [x] **TRM-04**: System Health panel with processor load and compute indicators
- [x] **TRM-05**: Token Latency panel with real-time-feeling metrics
- [x] **TRM-06**: Node Connections panel showing global connection status (Paris, Seoul, NYC, etc.)
- [x] **TRM-07**: Command input field with "EXECUTE LINK" button
- [x] **TRM-08**: Sidebar icons for section navigation (Dashboard, Analytics, Terminal, Patrol)

### Database & Server

- [x] **DATA-01**: D1 database created with valuations, scenario_runs, terminal_logs, system_metrics tables
- [x] **DATA-02**: Server functions for creating/reading valuations (CRUD)
- [x] **DATA-03**: Server functions for creating/reading scenario runs
- [x] **DATA-04**: KV cache layer with 1hr TTL on AI responses
- [x] **DATA-05**: Zod validation schemas for all server function inputs

### AI Integration

- [x] **AI-01**: Workers AI integration via AI Gateway with `@cf/meta/llama-3.1-8b-instruct-fast`
- [x] **AI-02**: Valuation prompt engineering returning structured JSON (value, projection, confidence, tier, density)
- [x] **AI-03**: Scenario generation prompts for all 3 What If experiments
- [x] **AI-04**: Fallback to `@cf/mistral/mistral-7b-instruct-v0.2` on primary model failure
- [x] **AI-05**: AI responses feel semi-real -- reasonable analysis wrapped in tactical aesthetic

### Deploy & Polish

- [ ] **DEPL-01**: Page transitions with AnimatePresence (fade + Y-translate)
- [ ] **DEPL-02**: Responsive design across desktop and tablet viewports
- [ ] **DEPL-03**: Loading states for AI-powered interactions
- [ ] **DEPL-04**: Error boundaries with tactical-themed error display
- [ ] **DEPL-05**: Production Cloudflare resources provisioned (D1, KV, R2, AI Gateway)
- [ ] **DEPL-06**: GitHub Actions CI/CD pipeline (typecheck -> build -> deploy)
- [ ] **DEPL-07**: Live deployment on `*.workers.dev` with shareable URL

## v2 Requirements

### Enhanced Interactivity

- **V2-01**: Real-time WebSocket terminal updates
- **V2-02**: Shareable valuation links with OG image generation
- **V2-03**: Comparison mode for multiple asset valuations side-by-side
- **V2-04**: Export valuation reports as PDF

### Content

- **V2-05**: Curated gallery of pre-valuated assets for first-time visitors
- **V2-06**: User-submitted asset images via R2 upload

## Out of Scope

| Feature | Reason |
|---------|--------|
| User authentication / accounts | Portfolio demo -- no need for user management |
| OAuth / social login | No auth system at all |
| Payment processing | No monetization planned |
| Mobile native app | Web-only portfolio piece |
| Multi-tenant data isolation | Single shared demo instance |
| Real-time WebSocket connections | Client-side fluctuation sufficient for v1 |
| Blog / content management | Not a content site |
| SEO optimization | Portfolio piece shared via direct link, not search |
| Accessibility (WCAG AA) | Dark neon aesthetic is inherently low-contrast; best-effort only |
| Internationalization | English only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| FOUN-05 | Phase 1 | Complete |
| FOUN-06 | Phase 1 | Complete |
| UICM-01 | Phase 1 | Complete |
| UICM-02 | Phase 1 | Complete |
| UICM-03 | Phase 1 | Complete |
| UICM-04 | Phase 1 | Complete |
| UICM-05 | Phase 1 | Complete |
| UICM-06 | Phase 1 | Complete |
| UICM-07 | Phase 1 | Complete |
| UICM-08 | Phase 1 | Complete |
| UICM-09 | Phase 1 | Complete |
| UICM-10 | Phase 1 | Complete |
| UICM-11 | Phase 1 | Complete |
| UICM-12 | Phase 1 | Complete |
| UICM-13 | Phase 1 | Complete |
| ENT-01 | Phase 2 | Complete |
| ENT-02 | Phase 2 | Complete |
| ENT-03 | Phase 2 | Complete |
| ENT-04 | Phase 2 | Complete |
| ENT-05 | Phase 2 | Complete |
| ENT-06 | Phase 2 | Complete |
| ENT-07 | Phase 2 | Complete |
| VAL-01 | Phase 3 | Pending |
| VAL-02 | Phase 3 | Pending |
| VAL-03 | Phase 3 | Pending |
| VAL-04 | Phase 3 | Pending |
| VAL-05 | Phase 3 | Pending |
| REV-01 | Phase 2 | Complete |
| REV-02 | Phase 2 | Complete |
| REV-03 | Phase 2 | Complete |
| REV-04 | Phase 2 | Complete |
| REV-05 | Phase 2 | Complete |
| REV-06 | Phase 2 | Complete |
| REV-07 | Phase 2 | Complete |
| WIF-01 | Phase 3 | Pending |
| WIF-02 | Phase 3 | Pending |
| WIF-03 | Phase 3 | Pending |
| WIF-04 | Phase 3 | Pending |
| WIF-05 | Phase 3 | Pending |
| WIF-06 | Phase 3 | Pending |
| WIF-07 | Phase 3 | Pending |
| TRM-01 | Phase 3 | Complete |
| TRM-02 | Phase 3 | Complete |
| TRM-03 | Phase 3 | Complete |
| TRM-04 | Phase 3 | Complete |
| TRM-05 | Phase 3 | Complete |
| TRM-06 | Phase 3 | Complete |
| TRM-07 | Phase 3 | Complete |
| TRM-08 | Phase 3 | Complete |
| DATA-01 | Phase 2 | Complete |
| DATA-02 | Phase 2 | Complete |
| DATA-03 | Phase 2 | Complete |
| DATA-04 | Phase 2 | Complete |
| DATA-05 | Phase 2 | Complete |
| AI-01 | Phase 2 | Complete |
| AI-02 | Phase 2 | Complete |
| AI-03 | Phase 2 | Complete |
| AI-04 | Phase 2 | Complete |
| AI-05 | Phase 2 | Complete |
| DEPL-01 | Phase 4 | Pending |
| DEPL-02 | Phase 4 | Pending |
| DEPL-03 | Phase 4 | Pending |
| DEPL-04 | Phase 4 | Pending |
| DEPL-05 | Phase 4 | Pending |
| DEPL-06 | Phase 4 | Pending |
| DEPL-07 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 70 total
- Mapped to phases: 70
- Unmapped: 0

---
*Requirements defined: 2026-03-21*
*Last updated: 2026-03-21 after roadmap creation*
