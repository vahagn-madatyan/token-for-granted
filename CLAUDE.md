<!-- GSD:project-start source:PROJECT.md -->
## Project

**Token For Granted — Tactical Arcana**

A Valorant-themed tactical asset valuation dashboard that lets users input tokens/assets, receive AI-powered valuations, explore "what if" scenarios, view tier rankings, and monitor a tactical terminal console. Built on Cloudflare's full stack (Workers, D1, KV, R2, AI Gateway) with TanStack Start. A dev community portfolio piece designed to be visually stunning and technically impressive.

**Core Value:** The visual experience must be jaw-dropping — pixel-perfect recreation of the Stitch screen designs with the Neon Monolith aesthetic, because this is a portfolio piece where first impressions are everything.

### Constraints

- **Tech stack**: TanStack Start + Cloudflare (Workers, D1, KV, R2, AI Gateway) — already decided per DESIGN.md
- **Design fidelity**: Pixel-perfect match to Stitch screen designs — non-negotiable
- **AI models**: Cloudflare Workers AI free tier (`@cf/meta/llama-3.1-8b-instruct-fast` primary, Mistral fallback)
- **Cost**: Must stay within Cloudflare free/cheap tiers — this is a portfolio project, not a funded product
- **Fonts**: Space Grotesk (headlines) + Inter (body) — from design system
- **No borders**: Tonal surface shifts for boundaries, not 1px borders — per Neon Monolith spec
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
