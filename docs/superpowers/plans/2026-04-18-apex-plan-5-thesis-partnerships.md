# Apex Redesign — Plan 5: Thesis + Partnerships

**Goal:** Ship `/thesis` (PE-deck parody), `/partnerships` (dubious-partnerships satire with fake form), `/partnerships/received` dead-end.

**Files:**
- Create: `src/components/ui/criteria-list.tsx`
- Create: `src/sites/apex/pages/thesis.tsx`
- Create: `src/sites/apex/pages/partnerships.tsx`
- Create: `src/sites/apex/pages/partnerships-form.tsx` (client form)
- Create: `src/sites/apex/pages/partnerships-received.tsx`
- Modify: `src/sites/apex/index.ts` — register pages
- Modify: `src/sites/apex/config.ts` — add Thesis + Partnerships to nav; remove Disclaimer (moves to footer-only later)

## Tasks
1. CriteriaList component
2. Thesis page (SPECIFIC framework, criteria, track record)
3. Partnerships page (criteria, process, form, FAQs)
4. Partnerships received dead-end
5. Register + nav
6. Build verify
