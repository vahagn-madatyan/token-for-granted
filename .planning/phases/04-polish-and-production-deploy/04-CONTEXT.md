# Phase 4: Polish and Production Deploy - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Add page transitions, responsive tablet layouts, loading states, error boundaries, and deploy the app live to Cloudflare Workers with GitHub Actions CI/CD. No new features — only polish and production readiness.

</domain>

<decisions>
## Implementation Decisions

### Polish & UX
- Page transitions: fade + Y-translate (10px) with 300ms duration using AnimatePresence wrapping the router Outlet
- Error boundary: tactical-themed "SYSTEM ERROR" HexCard with GlitchText header, error message, and "REINITIALIZE" retry button
- Loading states: pulsing glow skeleton — HexCard containers with pulseGlow animation variant and "PROCESSING..." text
- Responsive: desktop-first, tablet-friendly at 768px — stack columns vertically, reduce font sizes. No mobile optimization

### Deployment
- CI/CD: typecheck → build → deploy on push to main — simple GitHub Actions workflow, no tests
- Production resources: manual creation in CF dashboard, IDs stored in wrangler.jsonc — pipeline just deploys code
- URL: workers.dev only — `token-for-granted.workers.dev` is the shareable URL

### Claude's Discretion
No items deferred — all questions answered.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- All UI components from Phase 1
- All screen composites from Phases 2-3
- All backend infrastructure from Phase 2
- pulseGlow variant already defined in variants.ts
- HexCard and GlitchText for error boundary styling

### Established Patterns
- AnimatePresence pattern: wrap Outlet in __root.tsx
- TanStack Router for all route definitions
- Framer Motion variants for animations
- wrangler.jsonc already has all binding configurations

### Integration Points
- src/routes/__root.tsx — add AnimatePresence wrapper for page transitions
- Each route file — add responsive classes
- src/routes/index.tsx, src/routes/what-if.tsx — add loading states for AI interactions
- .github/workflows/deploy.yml — CI/CD pipeline (new file)

</code_context>

<specifics>
## Specific Ideas

- DESIGN.md specifies: GitHub Actions needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets
- Deploy command: `pnpm build && wrangler deploy`
- wrangler.jsonc already configured — just needs real D1/KV database IDs for production

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
