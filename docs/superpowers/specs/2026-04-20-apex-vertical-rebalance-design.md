# Apex Portfolio Vertical Rebalance & Sitemap Refresh

## Background

The apex (`specificindustries.com`) portfolio has grown to 33 active brands across five
verticals: Consumer Goods (14), Professional Services (11), Health & Wellness (4),
Subscription Services (2), and Hygiene (2). The distribution is lopsided — two
buckets carry 76 % of the portfolio and group businesses with very different
economics. Two recent additions (`thetheoryisreal` and `petjacks`) fit
awkwardly into the existing scheme. The home page also carries stale copy
("Building Enduring Value Across 28 Underserved Verticals") and the sitemap
is missing `petjacks` product detail pages.

## Goal

Re-categorize the 33 brands into six balanced verticals, update all code paths
and UI copy that reference the old taxonomy, and fill the sitemap gap.

## New Taxonomy

Six verticals replace the existing five. The new `VerticalKey` union is:

```
"food-beverage"
"consumer-household"
"hygiene-wellness"
"pets-specialty"
"media-platforms"
"professional-tech"
```

`verticalOrder` presents them in that sequence on the portfolio pages.

### Vertical assignments

| Vertical | Count | Brands |
| --- | --- | --- |
| Food & Beverage | 6 | bonelesswater, carterandfils, chunkymilk, dehydratedwater, pigmilk, prechewed |
| Consumer & Household Goods | 8 | inflatableanchors, meh, mousetrapjenga, rocks, snortables, squaredaway, superengineered, terrorclown |
| Hygiene, Health & Wellness | 5 | mostlysterile, radiumroys, seeltite, sovereignwellness, truegrit |
| Pets & Specialty Services | 3 | petjacks, pettential, whiskerworks |
| Media & Creator Platforms | 4 | elderparty, onlyfans, onlypans, thetheoryisreal |
| Professional Services & Technology | 7 | cleansheet, grassfedwifi, gristmill, oddoccasions, privatrix, stratify, strategicvoid |

### Vertical metadata

Each entry in `src/sites/apex/data/verticals.ts` keeps the existing
`VerticalMeta` shape (`key`, `displayName`, `shortDescription`, `thesis`).

- **Food & Beverage** — *"Consumable brands operating at the edge of food
  science, product language, and legal labeling."* Thesis: *"We invest in
  foodstuffs and beverages whose category name is itself a point of consumer
  negotiation."*
- **Consumer & Household Goods** — *"Packaged goods, manufactured items, games,
  and novelty products serving use-cases that retailers have not yet formally
  classified."* Thesis: *"We prefer consumer categories so specific that the
  product itself requires an explanation before it can be sold."*
- **Hygiene, Health & Wellness** — *"Hygiene, pharmaceutical-adjacent, and
  quasi-medical brands positioned at the edge of the regulatory envelope and
  recession-resistant by design."* Thesis: *"Consumers remain willing to pay
  for bodily outcomes that have not been proven, disproven, or meaningfully
  defined."*
- **Pets & Specialty Services** — *"Companion-animal platforms and adjacent
  specialty services whose customers are willing to pay on behalf of a second
  party."* Thesis: *"When the payer is not the end user, price sensitivity is
  a theoretical concern."*
- **Media & Creator Platforms** — *"Editorial, civic, and creator-economy
  platforms whose revenue model is inseparable from their audience's
  worldview."* Thesis: *"Categories where the content is the product remain
  chronically mispriced by firms who insist on distinguishing the two."*
- **Professional Services & Technology** — *"Advisory firms, specialty SaaS,
  privacy infrastructure, and incubated ventures that we are still actively
  categorizing."* Thesis: *"Where a category cannot be named, we believe that
  naming it is itself the service."*

## Scope of Edits

### Type system

- `src/themes/index.ts` — replace the five-value `VerticalKey` union with the
  six new keys.

### Vertical metadata and utilities

- `src/sites/apex/data/verticals.ts` — rewrite `verticals` record and
  `verticalOrder` array to use the six keys.
- `src/sites/apex/data/portfolio-utils.ts` — update the literal `grouped`
  initializer in `groupBrandsByVertical` to enumerate the six new keys.

### Brand configs (33 files)

Update the `verticalKey` field in each site config to the value dictated by
the assignment table. No other fields in the configs change.

### Apex pages

- `src/sites/apex/pages/home.tsx`
  - Update the `grouped` initializer map to the six new keys.
  - Replace the stale hero headline: *"Building Enduring Value Across 28
    Underserved Verticals"* becomes *"Building Enduring Value Across 33
    Specific Industries"*.
  - The careers teaser paragraph currently reads *"We are hiring for roles
    in Consumer Goods, Hygiene, Health & Wellness, Subscription Services,
    Professional Services, and at Corporate HQ (Virtual)."* Replace the
    inline list with the new vertical names and update the headline that
    says *"Across All Five Verticals"* to *"Across All Six Verticals"*.
- `src/sites/apex/pages/portfolio-explorer.tsx` — update the `grouped`
  initializer map.
- `src/sites/apex/pages/careers.tsx` — subheadline copy references *"all
  five verticals"*; bump to *"all six verticals"*.

### Careers taxonomy

- `src/sites/apex/data/careers.ts`
  - Replace the `CareersVertical` union with
    `"food-beverage" | "consumer-household" | "hygiene-wellness" |
    "pets-specialty" | "media-platforms" | "professional-tech" | "corporate"`.
  - Update `VERTICAL_LABELS` and `VERTICAL_ORDER` exports.
  - Re-map each of the 19 non-corporate job entries. The `corporate` entries
    are left untouched. The mapping is performed based on the job's actual
    subject matter rather than its old bucket name — e.g., a former
    *subscription-services* role for a creator-economy brand moves to
    `media-platforms`.
- `src/sites/apex/pages/careers-explorer.tsx` — update the `grouped`
  initializer map to the six new keys plus `corporate`.

### Sitemap fix

- `src/app/sitemap.ts`
  - Import `products as petjacksProducts` from `@/sites/petjacks/data/products`.
  - Add `petjacks: petjacksProducts` to the `productSites` record. The existing
    loop emits URLs at `https://<subdomain>.specificindustries.com/products/{slug}`,
    which matches the petjacks dynamic route shape.

## Out of Scope

- **Thesis page narrative** — the `/thesis` page narrative is left alone
  unless a hardcoded old vertical display name appears there; in that case
  we swap the string but do not rewrite surrounding paragraphs.
- **Press releases, leader bios, leader history** — these read
  `config.verticalKey` at runtime, so no touching is needed.
- **Per-site brand copy** — if a subsidiary brand's own pages mention
  "Consumer Goods" in body copy, those strings are brand voice and left
  alone.
- **Subdomain allowlist, registry** — already complete; no changes needed.

## Verification

- `npx tsc --noEmit` must pass. Any old `VerticalKey` literal left anywhere
  in the codebase will surface as a type error.
- `npm run lint` must pass.
- A final `grep` pass for `"consumer-goods"`, `"subscription-services"`,
  `"professional-services"`, `"health-wellness"`, and `"hygiene"` confirms
  no leaked literals outside of `careers.ts`'s `"corporate"` entry and any
  intentional out-of-scope string references.
- Manual check: load `localhost:3000/?site=apex` and confirm the home page
  shows six vertical sections with matching counts, and the portfolio
  explorer filter pills display the six new labels.

## Risk and Rollback

The change is mechanical and confined to apex's taxonomy + careers. Rollback
is a single `git revert` of the landing commit. There is no data migration,
no external surface change beyond the sitemap addition, and no user-visible
behaviour regression risk beyond stale copy we are fixing.
