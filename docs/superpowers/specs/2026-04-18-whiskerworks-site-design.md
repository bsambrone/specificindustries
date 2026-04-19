# Whiskerworks Advanced Feline Training Institute — Site Design

**Subdomain:** `whiskerworks`
**Date:** 2026-04-18
**Vertical:** `professional-services`
**Commerce:** Off

## 1. Concept & Tone

Whiskerworks is a satirical multi-division trade school that trains cats in implausible advanced skills. Surface tone is an **overconfident mall trade school** — cheap laminated flyers, Comic Sans disclaimers, aggressive "ENROLL NOW" banners, tuition financing footnotes — laid over a **straight-faced six-division org chart** that hints at something shadier. The Blackbook Division is never explained; it just exists, and its two course listings display only `[REDACTED]`.

The comedy lives in the copy (course names, syllabi, testimonials) and in photoreal images of cats performing implausibly complex human tasks (spy operations, airline piloting, jury duty). Execution is straight-faced; the implausibility is the joke.

**Brand:** Whiskerworks Advanced Feline Training Institute
**Tagline (primary):** "Your cat. Employed. In six weeks or less."
**Motto (latin nonsense):** *Felis Docendus Est* — "The cat must be taught"

## 2. Visual & Theme Direction

- **Background:** institutional off-white / fluorescent
- **Primary:** municipal blue or forest green (community-college chromatics)
- **Accent:** warning-sign orange for "ENROLL NOW" CTAs
- **Fonts:** serifed display font for division headers (gravitas), utilitarian sans-serif for body
- **Faculty portraits:** formal oval frames, yearbook style
- **Comic Sans:** reserved for the tiny disclaimer line in every page footer

Exact theme tokens (primary/secondary/accent hex values, font picks) are an implementation decision — the plan should set them.

## 3. Six Divisions & 20 Courses

### Academics Division — *"The mind is a terrible thing to waste on a cat."*
1. `theoretical-physics` — **Theoretical Physics for Cats** — "Schrödinger was one of us."
2. `tax-preparation` — **Intro to Tax Preparation** — "Your 1099s, mastered. Your W-2s, shredded."
3. `sommelier` — **Sommelier Certification** — "Nose, palate, disdain."

### Tactical Division — *"Deniability is a core learning outcome."*
4. `espionage` — **Covert Operations & Espionage** — "Rappel. Infiltrate. Shed."
5. `marksmanship` — **Advanced Marksmanship** — "Eight of nine lives hit the target."

### Industrial Division — *"OSHA is a suggestion."*
6. `bus-operation` — **Municipal Bus Operation** — "Route 42. Every stop. On time."
7. `blender-certification` — **Commercial Blender Certification** — "Liquify with confidence."
8. `forklift` — **Forklift & Warehouse Logistics** — "Lift smart. Stack smarter."
9. `airline-pilot` — **Commercial Airline Pilot** — "Flight 402 to Phoenix. Cleared for takeoff."

### Corporate Division — *"Climb the ladder. Sharpen your claws."*
10. `middle-management` — **Middle Management Fundamentals** — "Lead. Delegate. Nap."
11. `replace-your-human` — **Replace Your Human at Their Job** — "Six weeks. One lanyard. Zero suspicion."
12. `powerpoint` — **PowerPoint Mastery** — "Synergy. Pivoted. Purred."
13. `therapist` — **Licensed Therapist** — "Uh huh. And how does that make you feel?"

### Domestic Division — *"Adulthood, now with claws."*
14. `dmv` — **DMV Navigation & License Renewal** — "Now serving: Number 87."
15. `small-engine-repair` — **Small Engine Repair (Lawnmowers)** — "Two-stroke, four-paw."
16. `infant-childcare` — **Infant Childcare** — "Confident. Credentialed. Concerning."
17. `wedding-officiant` — **Wedding Officiant** — "By the power vested in me by whiskerworks.com..."
18. `jury-duty` — **Jury Duty Excellence** — "Guilty. Next."

### Blackbook Division — *"[Classification pending.]"*
19. `redacted-07` — **[REDACTED]** — entry displays only ▇▇▇▇▇▇▇ + "clearance required."
20. `redacted-19` — **[REDACTED]** — identical treatment, different URL.

Each non-Blackbook course gets a photoreal hero image and a full detail page (section 5). Blackbook courses render as solid-black pages with a non-functional login form.

## 4. Page Structure

Nine top-level pages + two dynamic route families.

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, enroll-now banner, six-division grid (one featured course each), alumni testimonial carousel, Comic Sans tuition-financing footnote |
| `/courses` | Full catalog grid of all 20 courses, filterable by division. Blackbook cards appear as solid-black `[REDACTED]` cards |
| `/divisions` | Index listing all six divisions with short flavor blurb + link |
| `/divisions/[slug]` | Per-division page — banner image, flavor copy, 2-3 featured cat faculty, course list. Blackbook division page is mostly black with a "clearance required" login form |
| `/courses/[slug]` | Per-course detail page (structure in section 5). Blackbook course pages are solid black with a non-functional login form |
| `/faculty` | All-cat faculty directory, grouped by division, ~15 entries total with oval-framed portraits |
| `/leadership` | Four human executives (details in section 6) |
| `/about` | Founding myth ("Est. 2019 above a Spirit Halloween"), accreditation disclaimer, one unreassuring campus photo |
| `/contact` | Satirical contact page; real contact email `bsambrone@gmail.com` in small print per site convention |
| `/privacy` | Umbrella callout + satirical body |
| `/terms` | Umbrella callout + satirical body |

**Commerce is off** — there is no cart and no purchase flow. Every CTA is an "Enroll Now" button that routes to a fake confirmation or reloads.

## 5. Course Detail Page Structure

Every non-Blackbook course page contains, in this order:

1. **Hero** — photoreal cat image + course name + tagline
2. **What You'll Learn** — 5-7 over-confident bullets
3. **Program Syllabus** — 6-8 weekly modules with escalating absurdity (Week 1 plausible; Week 8 not)
4. **Your Instructor** — one featured cat faculty member (portrait + bio)
5. **Tuition & Financing** — "Tuition: $4,800 or 24 easy payments of $247." (Intentionally does not multiply correctly.)
6. **Enroll Now** — orange warning-sign CTA

Blackbook course pages (`redacted-07`, `redacted-19`) replace the entire template with a black screen, `[REDACTED]` heading, and a non-functional login form. They are identical except for the URL slug.

## 6. Leadership Team

Per required site conventions: exactly **four entries, all male** (per user direction on this site), one per canonical `person` key — `bill`, `brandon`, `jim`, `sean`. **Both first and last names are fully randomized**; the `person` field is the photo-lookup key only and does not constrain the displayed name.

Final names are picked at implementation time. Working placeholders used in the plan:

| `person` | Working name | Title | Bio angle |
|---|---|---|---|
| `bill` | Cornelius Whitfield | **Chancellor & Founder** | Founded Whiskerworks in 2019 above a Spirit Halloween. "I saw a need." |
| `brandon` | Garrett Marsh | **Provost** | Previously founded three prior trade schools, all now closed. |
| `jim` | Russell Coleman | **Dean of the Blackbook Division** | Bio is mostly a black bar. One visible line: "Russell does not grant interviews." |
| `sean` | Vincent Dunn | **Chief Financial Officer** | Architect of the 24-easy-payments tuition plan. |

**Bill is the founder** (per standing convention — Chancellor is the Whiskerworks-flavored variant).

**Data file:** `src/sites/whiskerworks/data/leadership.ts` exports `leaders` with four entries, each including:
- `person: "bill" | "brandon" | "jim" | "sean"` (canonical field — not `referencePerson`/`baseImage`)
- `name` (fully randomized)
- `title`
- `bio`
- `portrait` (path to generated image)

**Portrait generation:** Use `generate_image_with_person` with the four reference photos. Style: ill-fitting suits, lanyards, strip-mall portrait backdrop — shady trade-school executives. Stored at `public/sites/whiskerworks/leaders/<person>.png`.

## 7. Faculty & Faculty Data

~15 cat faculty members total, 2-3 per division. Each faculty entry:

- Name in academic format ("Dr. Mittens, PhD", "Prof. Biscuit, MFA", "Sensei Dumpling")
- Title / rank
- Division association (one of the six slugs)
- Over-credentialed bio: one legitimate-sounding credential (a real school) + one preposterous one ("Visiting Lecturer, Regional Guaranteed Capital Solutions LLC")
- "Research Interests" line: three unrelated nouns ("Phenomenology, heavy machinery, yarn.")
- Portrait (oval-framed yearbook style)

**Data file:** `src/sites/whiskerworks/data/faculty.ts` exports `faculty` array with `getFacultyByDivision(slug)` helper.

Faculty names are written once and stable — they are not runtime-randomized.

## 8. Data Files

All under `src/sites/whiskerworks/data/`:

- `courses.ts` — array of 20 course objects + `getCourseBySlug(slug)` helper. Each course: `{ slug, title, tagline, divisionSlug, image, blurb, learningOutcomes: string[], syllabus: { week: number, title: string, description: string }[], featuredInstructorSlug, tuition: string, isRedacted: boolean }`.
- `divisions.ts` — array of 6 division objects + `getDivisionBySlug(slug)` helper. Each division: `{ slug, name, tagline, blurb, bannerImage, isRedacted: boolean }`.
- `faculty.ts` — ~15 faculty with helpers.
- `leadership.ts` — 4 human executives (per section 6).

## 9. Imagery Plan

~46 images total, all photoreal where people/cats appear.

| Asset | Count | Location |
|---|---|---|
| Homepage hero | 1 | `public/sites/whiskerworks/hero.jpg` |
| Campus "tour" photo | 1 | `public/sites/whiskerworks/campus.jpg` |
| Division banners | 6 | `public/sites/whiskerworks/divisions/<slug>.jpg` (Blackbook banner is a rendered solid-black card with `[CLASSIFICATION PENDING]` text — not a generated photo) |
| Course hero images | 18 | `public/sites/whiskerworks/courses/<slug>.jpg` (Blackbook courses have no image) |
| Faculty portraits | ~15 | `public/sites/whiskerworks/faculty/<slug>.jpg` — oval-cropped yearbook style |
| Leadership portraits | 4 | `public/sites/whiskerworks/leaders/<person>.png` |
| Favicon | 1 | `public/sites/whiskerworks/favicon.png` — 64×64 |

**Generation tooling:**
- **Cats:** `mcp__image-gen__generate_image` — straight-faced brochure photography, cat in role-appropriate costume/props, clean lighting, shallow depth of field. Consistent aesthetic across the site.
- **Leadership (humans):** `mcp__image-gen__generate_image_with_person` using reference people `bill`, `brandon`, `jim`, `sean`.
- **Blackbook visuals:** pure-black cards, sans-serif `[REDACTED]` — no generated imagery.

## 10. Signature Gags

Running bits that must appear in the implementation:

- **Footer Comic Sans disclaimer** — every page carries one tiny line, e.g. "Whiskerworks is not accredited by any accrediting body recognized by the Department of Education, the state of California, or the cat."
- **Alumni testimonials** — 4-6 reusable quotes cycled across the site. Format: first name + surprisingly specific job title. *"Biscuit now handles IT procurement at a mid-sized dental practice. We couldn't be prouder." — Verified Graduate*
- **Fake accreditation seal** — footer badge: "Accredited by the North American Council of Feline Vocational Excellence, Inc. (a wholly-owned subsidiary of Whiskerworks)."
- **Broken tuition math** — every course page shows "$4,800 or 24 easy payments of $247" (intentionally does not multiply).
- **Singular campus address** — "Suite 208, above the Spirit Halloween on Route 9." Reused in the footer, contact page, and about page.
- **"Enroll Now" CTAs** — orange button in header, hero, every course card, every division page.
- **Blackbook consistency** — the division, both course pages, and the Dean bio all share the same sparse black/redacted visual language. One visible line on the division page: "If you have been contacted regarding Blackbook enrollment, you already know how to proceed."

## 11. Required Site Conventions

Every new subdomain site must satisfy these (per standing portfolio conventions — bake in from the start, do not ask the user):

1. **Registry** — add `whiskerworks` to `siteRegistry` in `src/sites/registry.ts`.
2. **Subdomain allowlist** — add `"whiskerworks"` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts` (required for middleware — without this, the subdomain redirects to apex).
3. **`config.ts` fields** — must include `verticalKey: "professional-services"`, a short `tagline`, and `metadata.ogImage: "/sites/whiskerworks/hero.jpg"` for social previews.
4. **Favicon** — `public/sites/whiskerworks/favicon.png` at 64×64. Also add `whiskerworks` to the hardcoded sites array in `scripts/resize-favicons.mjs`.
5. **Privacy & Terms pages** — umbrella callout framed block at top pointing to `specificindustries.com/privacy` / `/terms`, then a satirical body in Whiskerworks voice with numbered H2-style sections covering data collection, cookies, rights, etc. Canonical shape: see `src/sites/pigmilk/pages/privacy.tsx`.
6. **Contact page** — satirical body, but the real email `bsambrone@gmail.com` must be discoverable somewhere in small print.
7. **Leadership data** — `src/sites/whiskerworks/data/leadership.ts` with 4 entries, one per canonical `person` (`bill`, `brandon`, `jim`, `sean`), with fully-randomized names. Enables apex Leader Detail pages to pick up this site in "Board Positions" automatically.
8. **Sitemap** — add whiskerworks' `courses` and `divisions` arrays to `src/app/sitemap.ts` so dynamic routes (`/courses/[slug]` and `/divisions/[slug]`) are crawlable. Static routes auto-cover via the registry loop.

## 12. File Layout Summary

```
src/sites/whiskerworks/
├── config.ts
├── index.ts                       # barrel: config, pages, dynamicRoutes
├── data/
│   ├── courses.ts                 # 20 courses + getCourseBySlug
│   ├── divisions.ts               # 6 divisions + getDivisionBySlug
│   ├── faculty.ts                 # ~15 cat faculty + getFacultyByDivision
│   └── leadership.ts              # 4 human executives
└── pages/
    ├── home.tsx
    ├── courses.tsx                # /courses grid
    ├── divisions.tsx              # /divisions index
    ├── faculty.tsx                # /faculty directory
    ├── leadership.tsx             # /leadership team
    ├── about.tsx
    ├── contact.tsx
    ├── privacy.tsx
    ├── terms.tsx
    ├── course-detail.tsx          # dynamic /courses/[slug]
    └── division-detail.tsx        # dynamic /divisions/[slug]

public/sites/whiskerworks/
├── hero.jpg
├── campus.jpg
├── favicon.png
├── divisions/<slug>.jpg
├── courses/<slug>.jpg
├── faculty/<slug>.jpg
└── leaders/<person>.png
```

## 13. Out of Scope

- Real enrollment backend — "Enroll Now" forms are non-functional
- Runtime randomization of names or faculty — all names are written once and stable per site
- Commerce / cart / checkout
- Backfilling name-convention fixes into older sites

---

*End of design.*
