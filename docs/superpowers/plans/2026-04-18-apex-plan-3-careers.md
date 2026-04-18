# Apex Redesign — Plan 3: Careers System

**Goal:** Ship 25 satirical job postings with inline list view, full detail pages, and a dead-end apply flow.

**Spec reference:** `docs/superpowers/specs/2026-04-18-apex-portfolio-pe-satire-design.md` (Section 6)

**Approach:** Content-heavy plan — the substance is the 25 role entries with deadpan PE-flavored copy and satirical compensation (money, alternative items like pistachios, or hybrids).

## Files

- Create: `src/sites/apex/data/careers.ts` — 25 JobListing entries + helpers
- Create: `src/sites/apex/pages/careers.tsx` — list/index page (server + client filter island)
- Create: `src/sites/apex/pages/careers-explorer.tsx` — "use client" filter island
- Create: `src/sites/apex/pages/career-detail.tsx` — detail dynamic route component
- Create: `src/sites/apex/pages/careers-applied.tsx` — shared dead-end
- Create: `src/components/ui/job-card.tsx`
- Modify: `src/sites/apex/index.ts` — register careers page, careers-applied, careers detail dynamic route
- Modify: `src/sites/apex/config.ts` — add Careers to nav

## Task 1: Create careers.ts

Create `src/sites/apex/data/careers.ts` with:
- `CareersVertical` type (5 portfolio keys + `"corporate"`)
- `JobCompensation`, `JobListing` interfaces
- `jobs: JobListing[]` with 25 entries (distribution: 5 consumer-goods, 3 hygiene, 3 health-wellness, 3 subscription-services, 5 professional-services, 6 corporate)
- `getJobBySlug`, `getJobsByVertical` helpers

Target comp mix: ~40% money range only, ~20% alternative-only, ~40% hybrid. Include weird-comp entries (pistachios, cheese wheels, tote bags, etc.).

Commit.

## Task 2: JobCard component

`src/components/ui/job-card.tsx` — compact row card for careers list.

## Task 3: Careers list page + explorer island

`careers.tsx` (server component) reads jobs + verticals, passes DTO to `careers-explorer.tsx` (client) which handles vertical chips + filter.

## Task 4: Career detail page

`career-detail.tsx` dynamic route component. Full layout: breadcrumb, header, about, responsibilities, qualifications, bonus points, compensation, benefits, apply CTA → `/careers/applied`, related openings, back link.

## Task 5: Applied dead-end

`careers-applied.tsx` — shared thank-you/dead-end. Reads `?role=<slug>` param for personalization.

## Task 6: Register routes + nav

Add to apex barrel: `careers` page, `careers/applied` page, `careers` dynamic route. Add `Careers` to nav.

## Task 7: Full verification

`npm run build` passes. `npx tsc --noEmit` passes.
