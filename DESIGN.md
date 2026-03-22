# Token For Granted - Architecture & Deployment Plan

## Context

Building a Valorant-themed tactical asset valuation dashboard from 5 Stitch screen designs in the "Valorant Token For granted" project. The app lets users input tokens/assets, get AI-powered valuations, explore "what if" scenarios, view tier rankings, and monitor a tactical terminal. Deploying fully on Cloudflare (Workers + Pages) with AI Gateway for cheap LLM calls.

**Current state:** Empty git repo. No code, no config, no dependencies.

---

## Framework Decision: TanStack Start

**Why TanStack Start over Next.js or Vite+FastAPI:**
- Native Cloudflare Workers support - no OpenNext abstraction layer
- Server functions call AI Gateway directly (no API route overhead)
- Vite-based = fast builds, small bundles, zero cold starts on Workers
- Full TypeScript inference across client/server boundary
- Single `wrangler deploy` - everything goes to Workers
- `create-cloudflare --framework=tanstack-start` official scaffolding

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | TanStack Start (React 19 + TanStack Router) |
| Styling | Tailwind CSS v4 + custom Neon Monolith design system |
| Animations | Framer Motion (`motion`) + CSS keyframes for persistent effects |
| AI | Cloudflare Workers AI via AI Gateway (FREE gateway, $0.011/1K neurons) |
| Models | `@cf/meta/llama-3.1-8b-instruct-fast` (primary), `@cf/mistral/mistral-7b-instruct-v0.2` (fallback) |
| Database | Cloudflare D1 (SQLite) |
| Cache | Cloudflare KV (1hr TTL on AI results) |
| Assets | Cloudflare R2 |
| Validation | Zod |
| Deploy | Wrangler + GitHub Actions CI/CD |

---

## The 5 Screens

### 1. Tactical Entry Protocol (`/`) - Landing/Input
- System metrics cards: 84.2 T-FLOPS, 1.4M ARC, +2.4%, 12ms latency
- Token input form - user enters asset description
- On submit: stores in D1, triggers AI valuation, redirects to `/valuation/$assetId`

### 2. Tactical Value Matrix (`/ranking`) - Tier Rankings
- S/A/B/C tier list of valuated items by "transformation potential"
- Density scores, animated progress bars, color-coded tiers

### 3. Tactical Reveal (`/valuation/$assetId`) - AI Valuation
- Asset card: current value, projected value, confidence %, growth ROI
- AI engine metrics (model confidence scores)
- Authentication status badge
- Category cards (games, art, narrative)

### 4. What If Lab (`/what-if`) - AI Scenarios
- 3 interactive experiment cards (Shakespearean Loop, Repo Foundry, Infinite Debate)
- Play triggers call Workers AI for creative generation
- Typewriter text reveal animation

### 5. Tactical Terminal (`/terminal`) - Monitoring Console
- Monospace command console with timestamped logs
- Boot sequence animation on first visit
- Live-feeling market metrics (client-side fluctuation)
- Security alert cards

---

## Directory Structure

```
token-for-granted/
├── .github/workflows/deploy.yml
├── public/fonts/                     # SpaceGrotesk + Inter woff2
├── src/
│   ├── routes/
│   │   ├── __root.tsx                # Shell, Header, Footer, ScanlineOverlay
│   │   ├── index.tsx                 # Screen 1: Tactical Entry Protocol
│   │   ├── ranking.tsx               # Screen 2: Value Matrix
│   │   ├── valuation.$assetId.tsx    # Screen 3: Tactical Reveal
│   │   ├── what-if.tsx               # Screen 4: What If Lab
│   │   └── terminal.tsx              # Screen 5: Tactical Terminal
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Shell, Sidebar
│   │   ├── ui/                       # GlitchText, NeonButton, HexCard, MetricDisplay,
│   │   │                             # TierBadge, StatusIndicator, ScanlineOverlay,
│   │   │                             # ProgressBar, TokenInput, TerminalLog
│   │   ├── screens/                  # Screen-specific composites
│   │   │   ├── entry/                # SystemMetrics, TokenForm, StatusPanel
│   │   │   ├── ranking/              # TierList, RankingCard, EnergyConverter
│   │   │   ├── valuation/            # AssetCard, ProjectionChart, AIEngineMetrics, AuthStatus
│   │   │   ├── whatif/               # ScenarioCard, IntensityMeter, PlayTrigger
│   │   │   └── terminal/             # CommandConsole, BootSequence, MarketMetrics, SecurityAlert
│   │   └── animations/              # variants.ts, useGlitch, useTypewriter, useCountUp
│   ├── core/
│   │   ├── functions/                # TanStack server functions (ai, valuation, ranking, whatif, terminal)
│   │   └── server/                   # Workers AI calls, D1 helpers, KV cache helpers
│   ├── lib/                          # design-tokens.ts, cn.ts, constants.ts, schemas.ts
│   ├── styles/                       # app.css, fonts.css, scanlines.css, glitch.css
│   ├── server.ts                     # Custom Workers entry
│   └── router.tsx                    # Router config
├── migrations/0001_initial.sql       # D1 schema
├── wrangler.jsonc                    # CF bindings: AI, D1, KV, R2
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Design System: The Neon Monolith

From the Stitch project theme:
- **Base:** `#060e20`, **Surface:** `#091328`, **Hero:** `#1f2b49`
- **Primary:** `#8ff5ff` (cyan), **Secondary:** `#ff59e3` (magenta), **Tertiary:** `#deffab` (lime)
- **Accent:** `#ff4655` (Valorant red)
- **Fonts:** Space Grotesk (headlines), Inter (body)
- **No 1px borders** - use tonal surface shifts for boundaries
- **Neon gradients** on CTAs, **ambient glows** instead of shadows
- **Round-8** border radius

### Full Color Tokens

```
surface:                #060e20
surface_container_low:  #091328
surface_container:      #0f1930
surface_container_high: #141f38
surface_container_highest: #192540
surface_bright:         #1f2b49
surface_variant:        #192540

primary:          #8ff5ff
primary_container: #00eefc
primary_dim:      #00deec

secondary:          #ff59e3
secondary_container: #ad009b

tertiary:          #deffab
tertiary_container: #abfc00

on_surface:         #dee5ff
on_surface_variant: #a3aac4
on_primary:         #005d63
on_secondary:       #42003a
on_tertiary:        #436600

outline:         #6d758c
outline_variant: #40485d

error:     #ff716c
error_dim: #d7383b
```

---

## AI Gateway Architecture

```
Client → createServerFn() → server handler → env.AI.run() w/ gateway config → Workers AI model
```

- AI Gateway: `token-for-granted-gateway` (FREE - no per-request cost)
- Gateway features: caching (reduces repeat calls), rate limiting, logging
- Primary model: `@cf/meta/llama-3.1-8b-instruct-fast` (~50-200 neurons/call)
- Free tier: 10K neurons/day = ~50-200 unique valuations/day
- All prompts request JSON output for deterministic parsing
- Results cached in KV with 1hr TTL

### Server Functions Pattern

```ts
// src/core/server/ai.server.ts
import { env } from 'cloudflare:workers'

export async function generateValuation(description: string) {
  return env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
    messages: [
      { role: 'system', content: VALUATION_SYSTEM_PROMPT },
      { role: 'user', content: description },
    ],
    max_tokens: 512,
  }, {
    gateway: { id: env.AI_GATEWAY_ID, skipCache: false },
  })
}
```

### Server Function Definitions

```ts
// src/core/functions/ai.functions.ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const analyzeAsset = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    description: z.string().min(1).max(500),
    category: z.enum(['collectible', 'art', 'tech', 'luxury', 'other']),
  }))
  .handler(async ({ data }) => {
    return generateValuation(data.description)
  })

export const runScenario = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    scenarioId: z.enum(['shakespearean-loop', 'repo-foundry', 'infinite-debate']),
    intensity: z.enum(['OMEGA', 'ALPHA', 'SIGMA']),
  }))
  .handler(async ({ data }) => {
    return generateScenario(data.scenarioId, data.intensity)
  })
```

**Fallback:** If `cloudflare:workers` import causes build issues (TanStack/router#6185), access bindings via request context: `getRequest().context.cloudflare.env`

---

## D1 Database Schema

```sql
-- Asset valuations
CREATE TABLE valuations (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  current_value REAL,
  projected_value REAL,
  confidence REAL,
  growth_rate REAL,
  tier TEXT CHECK(tier IN ('S','A','B','C')),
  density_score REAL,
  auth_status TEXT DEFAULT 'PENDING',
  asset_code TEXT,
  ai_raw_response TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- What-if scenario runs
CREATE TABLE scenario_runs (
  id TEXT PRIMARY KEY,
  scenario_id TEXT NOT NULL,
  intensity TEXT NOT NULL,
  result_text TEXT,
  tokens_used INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Terminal logs
CREATE TABLE terminal_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  level TEXT DEFAULT 'INFO',
  source TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata TEXT
);

-- System metrics snapshots
CREATE TABLE system_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  compute_tflops REAL,
  token_liquidity REAL,
  asset_performance REAL,
  latency_ms REAL,
  recorded_at TEXT DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX idx_valuations_tier ON valuations(tier);
CREATE INDEX idx_valuations_created ON valuations(created_at);
CREATE INDEX idx_terminal_logs_timestamp ON terminal_logs(timestamp);
CREATE INDEX idx_scenario_runs_scenario ON scenario_runs(scenario_id);
```

---

## Cloudflare Bindings (wrangler.jsonc)

```jsonc
{
  "name": "token-for-granted",
  "compatibility_date": "2026-03-20",
  "compatibility_flags": ["nodejs_compat"],
  "main": "src/server.ts",

  "ai": { "binding": "AI" },

  "d1_databases": [{
    "binding": "DB",
    "database_name": "token-for-granted-db",
    "database_id": "",
    "migrations_dir": "migrations"
  }],

  "kv_namespaces": [{
    "binding": "KV",
    "id": ""
  }],

  "r2_buckets": [{
    "binding": "ASSETS_BUCKET",
    "bucket_name": "token-for-granted-assets"
  }],

  "vars": {
    "AI_GATEWAY_ID": "token-for-granted-gateway",
    "ENVIRONMENT": "production"
  }
}
```

---

## Animation Strategy

### CSS (persistent, zero JS cost)
- **Scanline overlay:** Fixed position, repeating linear gradient (1px transparent, 1px rgba(0,0,0,0.05)), subtle vertical translation loop
- **Glitch effect:** Clip-path + color channel shift (text-shadow offset red/cyan) keyframes, `.glitch` utility class
- **Ambient glow:** Animated box-shadow opacity on hero cards and CTAs
- **Hex grid background:** CSS background-image with inline SVG data URI

### Framer Motion (interactive)
- **Page transitions:** AnimatePresence wrapping Outlet, fade + Y-translate
- **Staggered card reveals:** staggerChildren: 0.1 on containers
- **Number count-up:** `useCountUp(target, duration)` hook via requestAnimationFrame
- **Typewriter text:** `useTypewriter(text, speed)` hook for character-by-character reveal
- **Hover interactions:** whileHover scale 1.02 + neon glow box-shadow

### Shared Variants

```ts
// src/components/animations/variants.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(143, 245, 255, 0.1)',
      '0 0 40px rgba(143, 245, 255, 0.3)',
      '0 0 20px rgba(143, 245, 255, 0.1)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
}
```

---

## Implementation Phases

### Phase 1: Foundation
- Scaffold with `create-cloudflare --framework=tanstack-start`
- Install deps (tailwindcss@4, motion, zod, clsx, tailwind-merge)
- Configure vite.config.ts, wrangler.jsonc, tailwind with design tokens
- Add fonts, CSS (scanlines, glitch, app.css)
- Build root layout: Shell, Header, Footer, ScanlineOverlay
- **Verify:** `pnpm dev` renders shell with nav on all routes

### Phase 2: UI Component Library
- Build all `components/ui/` atoms (GlitchText, NeonButton, HexCard, MetricDisplay, TierBadge, StatusIndicator, ProgressBar, TokenInput, TerminalLog)
- Build animation hooks (useGlitch, useTypewriter, useCountUp, variants.ts)
- **Verify:** Each component renders correctly with design tokens

### Phase 3: Screen 1 - Tactical Entry Protocol
- Build index.tsx with SystemMetrics, TokenForm, StatusPanel
- Wire form to placeholder server function
- Count-up animations on metrics
- **Verify:** Landing page styled, form submits

### Phase 4: Database & Server Infrastructure
- Create D1 + KV locally, run migrations
- Build db.server.ts, cache.server.ts
- Build valuation.functions.ts (CRUD, no AI yet)
- **Verify:** Can create/retrieve valuations from D1

### Phase 5: AI Gateway Integration
- Create AI Gateway in CF Dashboard
- Build ai.server.ts with prompts + AI call wrappers
- Build ai.functions.ts (analyzeAsset, runScenario)
- Wire createValuation to trigger AI after D1 insert
- **Verify:** Form submission generates AI valuation stored in D1

### Phase 6: Screen 3 - Tactical Reveal
- Build valuation.$assetId.tsx with AssetCard, ProjectionChart, AIEngineMetrics, AuthStatus
- **Verify:** Nav from Screen 1 -> Screen 3 shows full valuation

### Phase 7: Screen 2 - Value Matrix
- Build ranking.tsx with TierList, RankingCard, EnergyConverter
- **Verify:** Rankings page shows valuations in tier order

### Phase 8: Screen 4 - What If Lab
- Build what-if.tsx with ScenarioCard, IntensityMeter, PlayTrigger
- Wire to AI scenario generation
- **Verify:** Each scenario generates creative AI output with typewriter reveal

### Phase 9: Screen 5 - Tactical Terminal
- Build terminal.tsx with CommandConsole, BootSequence, MarketMetrics, SecurityAlert
- Seed sample logs, add boot animation
- **Verify:** Full terminal with animations

### Phase 10: Polish & Deploy
- Page transitions, responsive design, loading states, error boundaries
- Create production D1/KV/R2, run remote migrations
- Set up GitHub Actions CI/CD
- First production deploy
- **Verify:** All 5 screens working on `*.workers.dev`

---

## Deployment

```bash
# Local dev
pnpm dev

# Production deploy
pnpm build && wrangler deploy

# CI/CD: GitHub Actions on push to main
# - typecheck -> test -> build -> wrangler deploy
```

**Required GitHub Secrets:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

---

## Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| `cloudflare:workers` import build issue | Keep imports in `.server.ts` files only; fallback to request context pattern |
| Workers AI free tier (10K neurons/day) | Aggressive KV caching (1hr TTL), supports ~50-200 unique valuations/day |
| TanStack Start version churn | Pin exact versions, avoid `^` ranges |
| D1 free tier limits | Add pagination to terminal logs, sufficient for demo |
