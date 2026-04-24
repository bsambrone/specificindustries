# image-gen MCP — Notes

## Potential migration: `gpt-image-2`

Released by OpenAI on 2026-04-21. Deferred — not yet swapped in. Notes for when we revisit:

### Swap points (drop-in compatible)
- `src/tools/generate-image.ts:39` — change `"gpt-image-1.5"` → `"gpt-image-2"`
- `src/tools/generate-image-with-person.ts:111` — change `"gpt-image-1"` → `"gpt-image-2"`

No other code changes required. Same endpoints (`images.generate`, `images.edit`), same `size` values, same `quality` values. Multi-reference edits still supported.

### What already matches gpt-image-2's requirements
- We omit `response_format` (gpt-image-2 returns base64 by default; same as 1.5).
- We omit `input_fidelity` on `images.edit` (gpt-image-2 always processes inputs at high fidelity; passing the param is a 400).

### Reasons we paused the swap
- **Pricing** — gpt-image-2 output pricing is materially higher than gpt-image-1.5. Check cost impact before flipping.
- **No transparent-background support** on gpt-image-2. Not used today, but if we ever need transparent PNGs, keep gpt-image-1.5 for those calls.
- **Rolling API availability** — announced 2026-04-21; broader developer rollout reported for early May 2026. Verify org-level access before swap.

### Features we're not using but exist in gpt-image-2
- Resolutions up to 4K and flexible aspect ratios (3:1 → 1:3).
- `size: "auto"` and `quality: "auto"`.
- Native reasoning ("thinks before drawing") — multi-panel consistency, multilingual text.
