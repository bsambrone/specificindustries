/**
 * Batch image generator for the Prechewed site.
 * Generates hero, favicon, 28 product pouches, 4 leadership portraits,
 * 6 press hero images, and 3 facility process floor shots.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-prechewed-images.ts
 *
 * Images saved to public/sites/prechewed/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/prechewed/data/products"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/prechewed")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "products"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leadership"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "press"), { recursive: true })

async function generateImage(
  prompt: string,
  filename: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  console.log(`  🎨 Generating ${filename}...`)
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

async function generateWithPerson(
  prompt: string,
  filename: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images for ${person}`)
    return
  }
  const photos = fs
    .readdirSync(personDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2)
  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }

  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    const inputImages = await Promise.all(
      photos.map(async (photo) => {
        const photoPath = path.join(personDir, photo)
        const buffer = fs.readFileSync(photoPath)
        const ext = path.extname(photo).toLowerCase()
        const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"
        return toFile(buffer, photo, { type: mime })
      })
    )
    const response = await openai.images.edit({
      model: "gpt-image-1",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Style constants ─────────────────────────────────────────

const POUCH_STYLE =
  "Matte-finish foil food pouch photographed on a clean surface with soft shadow. Label reads \"Prechewed™\" in clean sans-serif. Pale violet / bone-white setting, Athletic Greens product photography aesthetic. Single pouch, centered, shallow depth of field. Close framing. The pouch is sealed and has rounded corners."

// ─── Hero + favicon ───────────────────────────────────────────

const TOP_LEVEL_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [
    "A single matte-finish foil pouch standing upright on a pale violet/bone-white gradient with marble texture. The pouch has a clean, modern label reading \"Prechewed™ | Daily Bolus\" in clean sans-serif. Tech-startup product photography aesthetic — Athletic Greens / Huel coded. Warm neutral background (#FAFAF7 to #F1EFFA gradient). Shallow depth of field. No additional props. Studio lighting.",
    "hero.png",
    "1536x1024",
  ],
  [
    "Minimalist geometric mark: a stylized drop/bolus shape in deep electric violet (#5B3FD9) on a pale-white background. Bold, simple shape that reads clearly at 16-32px. Clean, modern, geometric. Could also be an abstract rendering of a foil pouch. No text. Pure geometric icon.",
    "favicon.png",
    "1024x1024",
  ],
]

// ─── Product pouch shots ──────────────────────────────────────

function getProductPrompt(slug: string, name: string, tagline: string): string {
  if (slug === "daily-bolus") {
    return "A single matte-finish foil pouch standing upright on a pale violet/bone-white gradient with marble texture. The pouch has a clean, modern label reading \"Prechewed™ | Daily Bolus\" in clean sans-serif. Tech-startup product photography aesthetic — Athletic Greens / Huel coded. Warm neutral background. Shallow depth of field. No additional props. Studio lighting. Square format."
  }
  if (slug === "founders-reserve") {
    return "Aged foil pouch with handwritten number \"32/47\" written on the front, dark matte finish with subtle numbering. Premium, restrained, collectible feel. Single pouch on dark surface, shallow depth of field. No text other than the number. Dramatic side-lighting."
  }
  return `${POUCH_STYLE} Label reads "Prechewed™ — ${name}" in clean sans-serif. ${tagline}`
}

// ─── Leadership portrait prompts ──────────────────────────────

const LEADERSHIP_PROMPTS: Array<{ filename: string; person: string; prompt: string }> = [
  {
    filename: "leadership/whitlock.png",
    person: "bill",
    prompt:
      "Silicon Valley founder/CEO headshot. Clean-shaven, quarter-zip over tee, confident half-smile, pale-white background. Natural studio lighting. Linear/Stripe exec aesthetic. Mid-30s to early 40s look. Professional portrait, tight crop, sharp focus.",
  },
  {
    filename: "leadership/mackey.png",
    person: "brandon",
    prompt:
      "SV startup exec headshot, Chief Mastication Officer. Wearing a dark blazer over white tee, clean-shaven, composed expression, pale violet background. Studio-lit, editorial-adjacent. Professional portrait, tight crop.",
  },
  {
    filename: "leadership/talbot.png",
    person: "jim",
    prompt:
      "Ex-McKinsey consultant turned startup Head of Product headshot. Quarter-zip sweater, warm neutral background, precise posture, slight smile, tech-exec coded. Professional portrait, tight crop, sharp focus.",
  },
  {
    filename: "leadership/lund.png",
    person: "sean",
    prompt:
      "Chief Science Officer headshot. Wearing a white lab coat over a tee, pale-white background, serious but approachable expression, rimless glasses optional. Nutritional biophysics PhD vibe. Clinical professional. Professional portrait, tight crop.",
  },
]

// ─── Press hero images ────────────────────────────────────────

const PRESS_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [
    "Startup CEO figure on a conference stage in warm stage lighting, mid-gesture presenting, purple/violet backdrop behind. TechCrunch conference aesthetic. Dramatic podium lighting. Wide shot. Cinematic composition. No text overlay.",
    "press/techcrunch.png",
    "1536x1024",
  ],
  [
    "Single matte-black foil pouch on a dark marble surface, dramatic side-lighting, handwritten number \"32/47\" visible on a small tag. Shot in the style of a luxury product editorial. Bloomberg Businessweek aesthetic. Deep blacks, precise highlights. Wide format.",
    "press/bloomberg.png",
    "1536x1024",
  ],
  [
    "Flat-lay product review shot — three matte Prechewed foil pouches with a notebook, coffee mug, and pen on a bright modern desk. Clean, editorial gadget-review aesthetic. The Verge product photography style. Pale violet and white tones. Natural overhead light.",
    "press/verge.png",
    "1536x1024",
  ],
  [
    "Lifestyle shot — a matte foil Prechewed pouch sitting on a minimalist marble kitchen counter next to a small potted herb and a folded linen napkin. Quiet, soft morning light. NYT Styles / Wirecutter aesthetic. Calm, editorial, tasteful. No text.",
    "press/nyt-styles.png",
    "1536x1024",
  ],
  [
    "Industrial interior — stainless steel food facility hallway with pale lavender-tinted lighting, polished concrete floor, no humans visible. Mysterious, clinical, slightly uncanny. WIRED magazine editorial aesthetic. Wide format, symmetric composition.",
    "press/wired.png",
    "1536x1024",
  ],
  [
    "Fashion editorial portrait — hands (no full face) holding a matte-black Prechewed foil pouch near a couture-looking sleeve, minimalist styling, editorial lighting. Vogue aesthetic. High-contrast, elegant, restrained. Wide format.",
    "press/vogue.png",
    "1536x1024",
  ],
]

// ─── Process / facility shots (saved as .jpg per process.tsx) ────

// Note: process.tsx references facility-1.jpg, facility-2.jpg, facility-3.jpg
const FACILITY_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [
    "Wide-angle stainless steel food production floor, pale lavender-tinted lighting, polished concrete floor, no humans visible, clinical and quiet. Food manufacturing aesthetic. Symmetric industrial composition. Muted violet and steel tones.",
    "facility-1.jpg",
    "1536x1024",
  ],
  [
    "Close-up of a pouch filling line — foil pouches being sealed by automated machinery, cool-toned lighting, precision equipment visible. Food production equipment photography. Clinical, precise, slightly surreal.",
    "facility-2.jpg",
    "1536x1024",
  ],
  [
    "A row of small cold-storage units with minimalist signage, pale industrial interior, subtle lavender-white lighting. No humans. Quiet facility aesthetic. Clean, restrained composition.",
    "facility-3.jpg",
    "1536x1024",
  ],
]

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  console.log("\n📸 Prechewed Image Generation\n")

  console.log("— Hero + Favicon —")
  for (const [prompt, filename, size] of TOP_LEVEL_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(2000)
  }

  console.log("\n— Product Pouch Shots (28 SKUs) —")
  for (const p of products) {
    const prompt = getProductPrompt(p.slug, p.name, p.tagline)
    await generateImage(prompt, `products/${p.slug}.png`, "1024x1024")
    await delay(2000)
  }

  console.log("\n— Leadership Portraits —")
  for (const { filename, person, prompt } of LEADERSHIP_PROMPTS) {
    await generateWithPerson(prompt, filename, person, "1024x1536")
    await delay(3000)
  }

  console.log("\n— Press Hero Images —")
  for (const [prompt, filename, size] of PRESS_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(2000)
  }

  console.log("\n— Process / Facility Shots —")
  for (const [prompt, filename, size] of FACILITY_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(2000)
  }

  console.log("\n✓ Done. Review images in public/sites/prechewed/\n")
}

main()
