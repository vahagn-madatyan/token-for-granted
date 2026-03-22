---
phase: 01-design-system-and-component-library
plan: 02
subsystem: ui
tags: [tanstack-router, shell-layout, header, footer, scanline-overlay, framer-motion, animation-hooks, routes]

# Dependency graph
requires:
  - phase: 01-design-system-and-component-library (plan 01)
    provides: TanStack Start skeleton, Tailwind v4 Neon Monolith tokens, CSS effects (scanlines, glitch, flicker)
provides:
  - Shell layout wrapping all routes with HUD corners, ambient glow, noise texture, dot grid
  - Header with TACTICAL ARCANA branding and nav links to 5 routes
  - Footer with ARCANUM LABS copyright and tactical links
  - ScanlineOverlay component using CSS scanline animation
  - 5 navigable routes (/, /ranking, /valuation/$assetId, /what-if, /terminal)
  - Framer Motion shared variants (fadeInUp, staggerContainer, scaleIn, pulseGlow)
  - useCountUp hook (requestAnimationFrame + easeOutExpo easing)
  - useTypewriter hook (character-by-character text reveal)
  - useGlitch hook (CSS glitch class toggle with auto-cleanup)
affects: [01-design-system-and-component-library, 02-screens-and-ai-integration, 03-ai-backend-and-data-layer, 04-polish-and-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [tanstack-router-file-routes, shell-layout-pattern, active-link-via-useRouterState, animation-hook-pattern]

key-files:
  created:
    - src/components/layout/Shell.tsx
    - src/components/layout/Header.tsx
    - src/components/layout/Footer.tsx
    - src/components/ui/ScanlineOverlay.tsx
    - src/routes/ranking.tsx
    - src/routes/valuation.$assetId.tsx
    - src/routes/what-if.tsx
    - src/routes/terminal.tsx
    - src/components/animations/variants.ts
    - src/components/animations/useCountUp.ts
    - src/components/animations/useTypewriter.ts
    - src/components/animations/useGlitch.ts
  modified:
    - src/routes/__root.tsx
    - src/routes/index.tsx
    - src/routeTree.gen.ts

key-decisions:
  - "Used useRouterState for active link detection rather than activeProps -- simpler pattern for comparing current pathname against link targets"
  - "Used Unicode symbols for header icon buttons instead of Material Symbols -- project does not use Google Fonts CDN per constraint"
  - "Shell uses fixed background layers with z-0 and relative z-10 main content -- ensures HUD frame, scanline, and background effects persist across route transitions"

patterns-established:
  - "Shell layout pattern: all routes wrapped in Shell via __root.tsx RootComponent"
  - "Animation hooks return state + controls: useCountUp returns number, useTypewriter returns {displayText, isComplete}, useGlitch returns {ref, triggerGlitch, isGlitching}"
  - "TanStack Router file-based routes with createFileRoute for type-safe routing"
  - "Active nav link pattern: compare routerState.location.pathname against link.to for class toggling"

requirements-completed: [FOUN-04, FOUN-05, UICM-10, UICM-11, UICM-12, UICM-13]

# Metrics
duration: 4min
completed: 2026-03-22
---

# Phase 01 Plan 02: Root Layout & Animation Infrastructure Summary

**Tactical Shell with TACTICAL ARCANA header, HUD corner brackets, ambient glow blobs, ScanlineOverlay, 5 navigable routes, and 3 animation hooks (useCountUp/useTypewriter/useGlitch) plus shared Framer Motion variants**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-22T06:02:47Z
- **Completed:** 2026-03-22T06:06:51Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments
- Built tactical Shell layout with HUD corner brackets (animate-bracket-in), ambient cyan/accent glow blobs, noise texture, dot grid, and ScanlineOverlay
- Header with TACTICAL ARCANA branding (text-glitch-hover), 4 nav links (PROTOCOL: ACTIVE, VALUE MATRIX, WHAT IF LAB, TERMINAL) with active link highlighting
- Footer with copyright text and DISCORD/DOCUMENTATION/LEGAL_PROVISIONS links
- 5 routes configured: /, /ranking, /valuation/$assetId, /what-if, /terminal with placeholder content
- 4 animation infrastructure files: fadeInUp/staggerContainer/scaleIn/pulseGlow variants, useCountUp (easeOutExpo), useTypewriter (setInterval), useGlitch (CSS class toggle)
- Build passes cleanly with zero TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create root layout with Shell, Header, Footer, ScanlineOverlay, and configure all 5 routes** - `7e23ce3` (feat)
2. **Task 2: Create animation hooks and shared Framer Motion variants** - `bd9ab8b` (feat, committed alongside 01-03 docs due to parallel execution)

## Files Created/Modified
- `src/components/layout/Shell.tsx` - App shell with HUD frame, background layers, Header, Footer, ScanlineOverlay
- `src/components/layout/Header.tsx` - Fixed navigation header with TACTICAL ARCANA branding and route links
- `src/components/layout/Footer.tsx` - Fixed footer with ARCANUM LABS copyright and links
- `src/components/ui/ScanlineOverlay.tsx` - Scanline CSS animation overlay component
- `src/routes/__root.tsx` - Updated to wrap Outlet in Shell component
- `src/routes/index.tsx` - Updated placeholder with TACTICAL ENTRY PROTOCOL heading
- `src/routes/ranking.tsx` - VALUE MATRIX placeholder route
- `src/routes/valuation.$assetId.tsx` - TACTICAL REVEAL route with dynamic assetId param
- `src/routes/what-if.tsx` - WHAT IF LAB placeholder route
- `src/routes/terminal.tsx` - TACTICAL TERMINAL placeholder route
- `src/routeTree.gen.ts` - Auto-regenerated with all 5 routes
- `src/components/animations/variants.ts` - Framer Motion shared variants (fadeInUp, staggerContainer, scaleIn, pulseGlow)
- `src/components/animations/useCountUp.ts` - Animated number count-up hook with easeOutExpo easing
- `src/components/animations/useTypewriter.ts` - Character-by-character text reveal hook
- `src/components/animations/useGlitch.ts` - Triggerable CSS glitch class toggle hook

## Decisions Made
- Used `useRouterState` for active link detection rather than `activeProps` -- simpler pattern for comparing current pathname against link targets
- Used Unicode symbols for header icon buttons instead of Material Symbols -- project does not use Google Fonts CDN per design constraint
- Shell uses fixed background layers with z-0 and relative z-10 main content -- ensures HUD frame, scanline, and background effects persist across route transitions without re-rendering

## Deviations from Plan

None - plan executed exactly as written.

**Parallel execution note:** Task 2 animation files were written to disk and subsequently committed by the parallel 01-03 agent in commit `bd9ab8b` (their docs commit picked up the untracked animation files). Content is identical to what was authored here.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 routes navigable with Shell layout providing consistent tactical HUD experience
- Animation hooks ready for consumption by MetricDisplay (useCountUp), TerminalLog (useTypewriter), GlitchText (useGlitch)
- Framer Motion variants ready for page transitions and card reveal animations
- Ready for Plan 03 (UI components) and Plan 04 (composite screen components)

## Self-Check: PASSED

All 15 created/modified files verified on disk. Both task commits (7e23ce3, bd9ab8b) verified in git log.

---
*Phase: 01-design-system-and-component-library*
*Completed: 2026-03-22*
