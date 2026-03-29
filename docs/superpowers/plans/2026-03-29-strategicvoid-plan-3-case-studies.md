# Strategic Void Consulting — Plan 3: Case Studies

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create all 16 case study data files (2 per solution area) with full satirical content using composed section components.

**Architecture:** Each case study is a data file exporting a `CaseStudy` object with a `sections: ContentSection[]` array. The `CaseStudyPage` renderer and all section components already exist from Plan 1.

**Tech Stack:** Next.js 15, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-29-strategicvoid-site-design.md`

**Depends on:** Plan 1 (components), Plan 2 (solution/product data)

---

## Content Guidelines

**Each case study uses 6-10 composed sections** from the content-sections library. Vary the section composition — don't use the same layout for every case study. Available sections:

`case-hero`, `challenge`, `approach`, `approach-timeline`, `results-grid`, `data-chart`, `before-after`, `executive-quote`, `client-quote`, `callout`

**Tone:** Deadpan corporate case study. The "challenges" are real problems (like employees completing work) solved the wrong way. Results are absurd metrics presented seriously. Client quotes are from fictional contacts who genuinely believe the solution worked.

**Executive quotes:** Rotate through all 4 executives as "engagement partners." Use their real fake names and image paths from `src/sites/strategicvoid/data/leadership.ts`.

**Data charts:** Use varied chart types (bar, line, pie, area). Data should trend in absurd directions — productivity going down is presented as success.

**Reference:** `src/sites/strategicvoid/data/case-studies/globaltech-meeting-optimization.ts` is the complete example from Plan 1.

---

## Case Study Titles (from spec)

1. Meeting Optimization: "How GlobalTech Dynamics reduced productive meetings by 73%" ✅ (DONE in Plan 1)
2. Meeting Optimization: "Pinnacle Financial's journey to 100% calendar saturation"
3. KPI Alignment: "Meridian Health achieved 200% KPI compliance by redefining all metrics"
4. KPI Alignment: "How Apex Logistics hit every target by removing accountability"
5. Middle Management: "Stratton Industries doubled management layers with zero output change"
6. Middle Management: "How CoreBridge Solutions empowered leaders to delegate delegation"
7. Productivity Theater: "NovaCorp's 340% increase in perceived productivity"
8. Productivity Theater: "How DataPlex Systems achieved FocusBand™ adoption across 12 time zones"
9. Compliance & Policy: "Vanguard Media's path to 100% checkbox completion without reading anything"
10. Compliance & Policy: "How Sterling Pharmaceuticals redistributed risk until nobody was responsible"
11. Communication Enhancement: "How Broadleaf Consulting reduced email clarity by 89%"
12. Communication Enhancement: "Titan Manufacturing's reply-all optimization saved 4,000 unproductive hours"
13. Decision Support: "How Keystone Analytics eliminated decision-making from the C-suite"
14. Decision Support: "Pacific Rim Holdings delayed 14 strategic decisions into irrelevance"
15. Employee Experience: "MandatoryFun™ drove a 450% increase in scheduled enjoyment at Crestwood Corp"
16. Employee Experience: "How Ironbridge Partners replaced raises with pizza and saw morale metrics improve"

NOTE: The product names were renamed during Plan 2. The implementer should READ `src/sites/strategicvoid/data/products.ts` to use CURRENT product names in case study content.

---

## Task Structure

Each task creates 3 case study data files (one task per pair of solution areas to batch efficiently), adds them to the barrel index, and commits.

---

## Task 1: Meeting Optimization #2 + KPI Alignment Case Studies (3 files)

**Files:**
- Create: `src/sites/strategicvoid/data/case-studies/pinnacle-calendar-saturation.ts`
- Create: `src/sites/strategicvoid/data/case-studies/meridian-health-kpi.ts`
- Create: `src/sites/strategicvoid/data/case-studies/apex-logistics-kpi.ts`
- Modify: `src/sites/strategicvoid/data/case-studies/index.ts`

- [ ] **Step 1:** Read the example case study, products.ts, and leadership.ts for reference
- [ ] **Step 2:** Create all 3 case studies with varied section compositions (6-10 sections each)
- [ ] **Step 3:** Add all 3 to the barrel index
- [ ] **Step 4:** Run `npx tsc --noEmit`
- [ ] **Step 5:** Commit: `git commit -m "feat: add case studies for Meeting Optimization and KPI Alignment"`

## Task 2: Middle Management + Productivity Theater Case Studies (4 files)

**Files:**
- Create: `src/sites/strategicvoid/data/case-studies/stratton-management-layers.ts`
- Create: `src/sites/strategicvoid/data/case-studies/corebridge-delegation.ts`
- Create: `src/sites/strategicvoid/data/case-studies/novacorp-perceived-productivity.ts`
- Create: `src/sites/strategicvoid/data/case-studies/dataplex-focusband.ts`
- Modify: `src/sites/strategicvoid/data/case-studies/index.ts`

- [ ] **Step 1-5:** Same pattern as Task 1
- [ ] **Commit:** `git commit -m "feat: add case studies for Middle Management and Productivity Theater"`

## Task 3: Compliance + Communication Case Studies (4 files)

**Files:**
- Create: `src/sites/strategicvoid/data/case-studies/vanguard-checkbox-completion.ts`
- Create: `src/sites/strategicvoid/data/case-studies/sterling-risk-redistribution.ts`
- Create: `src/sites/strategicvoid/data/case-studies/broadleaf-email-clarity.ts`
- Create: `src/sites/strategicvoid/data/case-studies/titan-reply-all.ts`
- Modify: `src/sites/strategicvoid/data/case-studies/index.ts`

- [ ] **Step 1-5:** Same pattern
- [ ] **Commit:** `git commit -m "feat: add case studies for Compliance and Communication Enhancement"`

## Task 4: Decision Support + Employee Experience Case Studies (4 files)

**Files:**
- Create: `src/sites/strategicvoid/data/case-studies/keystone-decision-elimination.ts`
- Create: `src/sites/strategicvoid/data/case-studies/pacific-rim-decision-delay.ts`
- Create: `src/sites/strategicvoid/data/case-studies/crestwood-mandatoryfun.ts`
- Create: `src/sites/strategicvoid/data/case-studies/ironbridge-pizza-morale.ts`
- Modify: `src/sites/strategicvoid/data/case-studies/index.ts`

- [ ] **Step 1-5:** Same pattern
- [ ] **Commit:** `git commit -m "feat: add case studies for Decision Support and Employee Experience"`

## Task 5: Verification

- [ ] **Step 1:** Run `npx tsc --noEmit`
- [ ] **Step 2:** Run `npm run build`
- [ ] **Step 3:** Verify all 16 case studies are in the barrel index
- [ ] **Step 4:** Commit any fixes if needed
