# Token For Granted — Tactical Arcana

## What This Is

A Valorant-themed tactical asset valuation dashboard that lets users input tokens/assets, receive AI-powered valuations, explore "what if" scenarios, view tier rankings, and monitor a tactical terminal console. Built on Cloudflare's full stack (Workers, D1, KV, R2, AI Gateway) with TanStack Start. A dev community portfolio piece designed to be visually stunning and technically impressive.

## Core Value

The visual experience must be jaw-dropping — pixel-perfect recreation of the Stitch screen designs with the Neon Monolith aesthetic, because this is a portfolio piece where first impressions are everything.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 5 pixel-perfect screens matching Stitch designs (Entry, Valuation, Rankings, What-If Lab, Terminal)
- [ ] AI-powered asset valuation via Cloudflare Workers AI with semi-real analysis
- [ ] Neon Monolith design system (dark base, cyan/magenta/lime accents, Space Grotesk + Inter)
- [ ] Animated UI: scanlines, glitch text, count-up numbers, typewriter reveals, staggered card reveals
- [ ] What-If Lab with 3 AI scenarios (Shakespearean Loop, Repo Foundry, Infinite Debate)
- [ ] Tier ranking system (S/A/B/C) with density scores
- [ ] Tactical Terminal with boot sequence, timestamped logs, market metrics
- [ ] D1 database for valuations, scenarios, terminal logs, system metrics
- [ ] KV caching on AI results (1hr TTL)
- [ ] Page transitions and responsive design
- [ ] Deployed live on `*.workers.dev` with shareable URL
- [ ] GitHub Actions CI/CD pipeline

### Out of Scope

- User authentication / accounts — not needed for portfolio demo
- Real-time WebSocket connections — client-side fluctuation is sufficient
- Mobile native app — web-only
- Payment processing — no monetization
- Multi-tenant / multi-user data isolation — single shared instance
- OAuth / social login — no auth at all

## Context

- 5 Stitch screen designs exist as reference (`screen.png` + `code.html` in each directory)
- DESIGN.md contains full architecture plan: tech stack, DB schema, animation strategy, directory structure
- Target audience is dev community (Twitter/X, GitHub) — visual impact and technical depth both matter
- AI valuations should be semi-real: reasonable analysis wrapped in tactical/Valorant aesthetic
- Cloudflare free tier constraints: 10K neurons/day (~50-200 unique valuations), D1 free tier
- TanStack Start has native Cloudflare Workers support — no OpenNext abstraction needed

## Constraints

- **Tech stack**: TanStack Start + Cloudflare (Workers, D1, KV, R2, AI Gateway) — already decided per DESIGN.md
- **Design fidelity**: Pixel-perfect match to Stitch screen designs — non-negotiable
- **AI models**: Cloudflare Workers AI free tier (`@cf/meta/llama-3.1-8b-instruct-fast` primary, Mistral fallback)
- **Cost**: Must stay within Cloudflare free/cheap tiers — this is a portfolio project, not a funded product
- **Fonts**: Space Grotesk (headlines) + Inter (body) — from design system
- **No borders**: Tonal surface shifts for boundaries, not 1px borders — per Neon Monolith spec

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| TanStack Start over Next.js | Native CF Workers support, no OpenNext layer, single `wrangler deploy` | — Pending |
| Cloudflare Workers AI over OpenAI | Free gateway, $0.011/1K neurons, zero external API keys needed | — Pending |
| D1 over external Postgres | Zero latency to Workers, free tier sufficient for portfolio demo | — Pending |
| Framer Motion + CSS hybrid animations | CSS for persistent effects (scanlines, glitch), FM for interactive (page transitions, hover) | — Pending |
| No authentication | Portfolio demo doesn't need user accounts — simplifies architecture | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-21 after initialization*
