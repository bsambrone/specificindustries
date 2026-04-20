/**
 * Batch image generator for The Theory Is Real.
 * Generates: hero, favicon, 5 category tiles, 20 theory heroes,
 *            24 evidence photos, 18 product shots.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-thetheoryisreal-images.ts
 *
 * Images saved to public/sites/thetheoryisreal/. Existing files are skipped (resumable).
 */

import OpenAI from "openai"
import fs from "fs"
import path from "path"
import { theories, categories } from "../src/sites/thetheoryisreal/data/theories"
import { products } from "../src/sites/thetheoryisreal/data/products"
import { evidenceItems } from "../src/sites/thetheoryisreal/data/evidence"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/thetheoryisreal")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
for (const sub of ["categories", "theories", "evidence", "products"]) {
  fs.mkdirSync(path.join(OUTPUT_DIR, sub), { recursive: true })
}

async function generateImage(
  prompt: string,
  relpath: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, relpath)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${relpath} (already exists)`)
    return
  }
  console.log(`  🎨 Generating ${relpath}...`)
  try {
    const res = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })
    const data = res.data?.[0]
    if (!data) throw new Error("No image data returned")
    if (data.b64_json) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, Buffer.from(data.b64_json, "base64"))
    } else if (data.url) {
      const r = await fetch(data.url)
      const buffer = Buffer.from(await r.arrayBuffer())
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${relpath}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${relpath}: ${msg}`)
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Shared style fragment ────────────────────────────────────────────────────
const SHARED_STYLE =
  "Photographic. Grainy. Slightly desaturated. Aged, faded film quality. Low contrast. Neutral palette with muted warm tones. Slight vignetting. Looks like it was scanned from a faded print or captured on an aging consumer camera. Subject is off-center, slightly awkward framing. Not stylized; not glossy; not obviously AI."

// ─── Category tile prompts ────────────────────────────────────────────────────
const CATEGORY_PROMPTS: Record<string, string> = {
  atmospheric: `${SHARED_STYLE} Grainy photograph of a pale sky with unnatural cross-hatch contrail patterns above a residential rooftop. Afternoon light.`,
  "global-control": `${SHARED_STYLE} Grainy photograph of a fluorescent-lit corporate boardroom with empty leather chairs, one slightly askew. View through a door that is ajar.`,
  reptilian: `${SHARED_STYLE} Grainy photograph of a green-tinged aquarium at a restaurant, out-of-focus diners in the background, one subject's eye catching light at an unnatural angle.`,
  "digital-reality": `${SHARED_STYLE} Grainy photograph of a crowded commuter bus from the driver's-seat perspective — dozens of passengers all looking at phones, identical posture, neutral expressions, slight digital compression artifacts on faces.`,
  "weaponized-tech": `${SHARED_STYLE} Grainy photograph of the side of an electrical substation at dusk, chain-link fence, humming transformers, one indicator light glowing red.`,
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n📸 The Theory Is Real — Image Generation\n")

  console.log("— Homepage hero —")
  await generateImage(
    `${SHARED_STYLE} A grainy, nighttime overhead photograph of a suburban cul-de-sac. Faint orange streetlight glow. A single unfamiliar light in the distance. The image should feel unremarkable but subtly wrong.`,
    "hero.png",
    "1536x1024"
  )
  await delay(2000)

  console.log("\n— Favicon —")
  await generateImage(
    `A stark, minimal graphic: a hand-drawn circled eye over a dark square background. High contrast, poster style. Centered, symmetrical.`,
    "favicon.png",
    "1024x1024"
  )
  await delay(2000)

  console.log(`\n— Category tiles (${categories.length}) —`)
  for (const c of categories) {
    const prompt = CATEGORY_PROMPTS[c.key]
    if (!prompt) {
      console.error(`  ✗ categories/${c.key}.png: no prompt defined`)
      continue
    }
    await generateImage(prompt, `categories/${c.key}.png`, "1536x1024")
    await delay(2000)
  }

  console.log(`\n— Theory heroes (${theories.length}) —`)
  for (const t of theories) {
    const prompt = `${SHARED_STYLE} Illustration for a conspiracy article titled "${t.title}". Dek: "${t.dek}". Subject should be mundane, specific, and visually plausible. Avoid any on-screen text, logos, or watermarks. Avoid sci-fi styling. The image should look like it was shot by an observer who happened to be there.`
    await generateImage(prompt, `theories/${t.slug}.png`, "1536x1024")
    await delay(2000)
  }

  console.log(`\n— Evidence photos (${evidenceItems.length}) —`)
  for (const e of evidenceItems) {
    const prompt = `${SHARED_STYLE} Deliberately mundane "evidence" photograph, amateur framing. Caption for reference: "${e.caption}". Subject should be clearly visible in the frame. No annotations or overlays.`
    await generateImage(prompt, `evidence/${e.id}.png`, "1024x1024")
    await delay(2000)
  }

  console.log(`\n— Products (${products.length}) —`)
  for (const p of products) {
    const cleanStyle = SHARED_STYLE.replace("Grainy. ", "Clean. ").replace("Grainy,", "Clean,")
    const prompt = `${cleanStyle} Earnest product catalog photograph of "${p.name}". Plain neutral background, centered, studio lighting. Tagline for reference: "${p.tagline}". Do not include price, logos, or on-image text.`
    await generateImage(prompt, `products/${p.slug}.png`, "1024x1024")
    await delay(2000)
  }

  console.log("\n✓ Done. Review images in public/sites/thetheoryisreal/\n")
}

main()
