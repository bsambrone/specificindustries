# Gristmill Partners — Plan 4: Images

> **Execution note:** This plan is executed directly in the controller session via MCP `image-gen` tools (`generate_image`, `generate_image_with_person`). It is not broken into subagent tasks because each step is a single tool call; the controller can pipeline generations and move files after each batch.

**Goal:** Generate approximately 80 gristmill-specific images plus 12 new shared testimonial portraits to populate the site built across Plans 1–3. Every `<Image>` tag currently 404s against its `/sites/gristmill/...` path; this plan produces all the referenced files.

**Approach:**
1. Use the `mcp__image-gen__generate_image` MCP tool for scene/product images.
2. Use the `mcp__image-gen__generate_image_with_person` tool for the 4 executive portraits (referencing `bill`, `brandon`, `jim`, `sean` base-image identities).
3. Use `generate_image` (no reference) for the 12 new shared testimonial headshots.
4. Apply a consistent **shared style directive** to every prompt: 1970s industrial editorial photography, warm cream / beige / burnt-orange / amber palette, grainy Kodachrome paper look, era-appropriate wardrobe and props, slight vignette, soft warm color cast.
5. Quality: `medium` to keep cost manageable (~$0.07/image vs $0.19 at high). Satirical content does not need max quality.
6. Every image lands in `generated-images/` (the MCP server's output dir), then gets moved to its final location under `public/sites/gristmill/**/` or `public/shared/testimonials/` and committed in batches.

**Tone guidance for employee images:** slumped shoulders, thousand-yard stares, defeated posture, fake strained smiles. **Tone guidance for executives:** upright, smug, unsettlingly cheerful, dressed better than the room warrants, slightly elevated or backlit.

## Image Budget (~96 images total)

### Batch A — Exec Portraits (4 images) — `generate_image_with_person`
Each rendered as a 1024×1024 1970s captain-of-industry headshot.

- `earl-crendon.png` — person: `bill` — "Founder & Chairman Emeritus" — tweed three-piece suit, mahogany boardroom, 1970s tungsten lighting
- `theodore-brenner.png` — person: `brandon` — "President & Chief Executive Officer" — charcoal three-piece suit, warm office backdrop
- `harold-duvane.png` — person: `jim` — "Chief Operating Officer" — muted brown three-piece suit with a pocket square, factory floor backdrop
- `lester-knippenburg.png` — person: `sean` — "Chief Financial Officer" — dark brown three-piece suit, desk with antique stopwatch and ledger

Target: `public/sites/gristmill/execs/<name>.png`

### Batch B — Homepage & Page Heroes (12 images) — `generate_image`

Sizes vary — hero images use 1536×1024 (landscape wide).

- `home-hero.png` (1536×1024) — industrial lobby with brass "Gristmill Partners" plaque, unhappy employees trudging past
- `about-hero.png` (1536×1024) — mahogany boardroom, wide shot, empty but lit
- `contact-hero.png` (1536×1024) — stern receptionist at an oak reception desk, 1970s office
- `services-index-hero.png` (1536×1024) — warehouse of filing cabinets, long perspective
- `case-studies-hero.png` (1536×1024) — wide shot of a dimly lit records room with bound ledgers
- `home-mission.png` (1024×1024) — steel mill interior, grain being ground, industrial texture
- `home-approach.png` (1024×1024) — close-up of a stopwatch on a clipboard, sepia tones
- `home-featured-case.png` (1024×1024) — defeated factory worker at a workbench, fluorescent-lit
- `home-founder-teaser.png` (1024×1024) — aging man at a mahogany desk watching a sunset through a grimy window
- `about-mill.png` (1024×1024) — black-and-white archival-style shot of a converted grain mill building (1962 era)
- `about-wheel.png` (1024×1024) — close-up of an industrial grinding wheel, dramatic light
- `contact-map.png` (1024×1024) — framed vintage map of the Ohio/Pennsylvania/Connecticut triangle showing three office locations

Target: `public/sites/gristmill/<name>.png`

### Batch C — Arm Landing Hero Images (10 images) — `generate_image`

All 1536×1024. Subject matter per arm is listed in the spec. Examples:
- `training.png` — glazed audience in a projector-lit conference room
- `communications.png` — lone worker facing a wall-sized bulletin board of memos
- `restructuring.png` — office full of moving boxes labeled "Your Position"
- `retention.png` — executive silhouette through frosted glass at end of long hall
- `performance.png` — wall of pie charts and stopwatch-wielding supervisor
- `management.png` — exhausted manager trapped between a smiling exec and a crying subordinate
- `compensation.png` — executive handing a cardboard check marked "growth opportunity"
- `engagement.png` — lone employee in a party hat at a cake labeled "attendance mandatory"
- `tooling.png` — tangled ethernet-cable cathedral, blue screens on every monitor
- `workspace.png` — flickering fluorescents over a seatless office

Target: `public/sites/gristmill/arms/<slug>.png`

### Batch D — Service Detail Hero Images (47 images) — `generate_image`

All 1024×1024. One per service. Each prompt derives from the service's name and tagline, styled per the shared directive. These are the longest batch and the most tolerant of visual repetition — they can lean on simple editorial still lifes.

Target: `public/sites/gristmill/services/<slug>.png`

### Batch E — Case Study Hero Images (8 images) — `generate_image`

All 1536×1024. Each depicts the fictional client's workforce mid-engagement, setting appropriate to the client's industry (manufacturing floor, insurance office, refinery break room, etc.).

Target: `public/sites/gristmill/case-studies/<slug>.png`

### Batch F — New Shared Testimonial Faces (12 images) — `generate_image`

All 1024×1024 neutral studio headshots (no gristmill-specific theming). Mix of middle-aged white-collar workers, varied in apparent age, gender, ethnicity. These get added to the shared portfolio-wide `public/shared/testimonials/` folder and become reusable by every site.

Fake names for the 12 new faces (use lowercase with hyphens for filenames):
- `hattie-bronwyn.png` — middle-aged woman, late 40s, grey hair
- `warren-duvall.png` — middle-aged man, early 50s, goatee
- `margot-finch.png` — early-50s woman, horn-rimmed glasses
- `orson-pepperdine.png` — early-60s man, thinning hair, soft features
- `rosalind-keck.png` — late-40s woman, athletic
- `clement-ashby.png` — early-40s man, broad-shouldered
- `adelaide-muncy.png` — late-50s woman, warm expression
- `theodora-lindquist.png` — early-30s woman, serious
- `beauregard-holt.png` — early-60s man, bearded
- `priscilla-voss-bingham.png` — late-40s woman, tailored blazer
- `eamon-trestle.png` — mid-40s man, bow tie
- `fenella-ostrom.png` — late-30s woman, relaxed

Target: `public/shared/testimonials/<name>.png`

## Execution Order

1. Confirm output directory location via a single test generation (small, medium quality).
2. Batch A — execs (4 images).
3. Batch B — site heroes (12 images).
4. Batch C — arm heroes (10 images).
5. Batch E — case studies (8 images).
6. Batch F — shared testimonial faces (12 images).
7. Batch D — service detail heroes (47 images). Largest batch; save for last so earlier work is committed regardless.
8. After each batch: move files from `generated-images/` to their final directories and commit.

## Done When

- Every image path referenced by page components has a corresponding file on disk.
- 12 new faces added to `public/shared/testimonials/`.
- Dev-server smoke test of home / one arm / one service / one case study shows real images loading instead of 404.
- All image files committed to git.
