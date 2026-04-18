# Apex Redesign — Plan 4: Newsroom System

**Goal:** Ship the `/newsroom` index page and `/newsroom/[slug]` detail pages with 10 full satirical press releases.

**Spec reference:** Section 10 of design spec.

## Files

- Create: `src/sites/apex/data/press-releases.ts` — 10 releases with full body paragraphs
- Create: `src/components/ui/press-release-card.tsx`
- Create: `src/sites/apex/pages/newsroom.tsx` — server index page
- Create: `src/sites/apex/pages/press-release-detail.tsx` — dynamic route component
- Modify: `src/sites/apex/index.ts` — register newsroom page + dynamic route
- Modify: `src/sites/apex/config.ts` — add Newsroom to nav

## Tasks

1. Write `press-releases.ts` with 10 releases (400-600 words of body each, structured with dateline/lede/quotes/boilerplate)
2. Build `PressReleaseCard` component
3. Build `/newsroom` index page
4. Build press release detail page
5. Register routes + nav
6. Build + commit
