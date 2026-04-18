/**
 * Batch image generator for Sovereign Wellness Co. site.
 * Uses OpenAI's gpt-image-1 model to generate hero, founder portraits,
 * treatment product images, and dispatch hero images.
 *
 * Usage: set -a; source .env; set +a; npx tsx scripts/generate-sovereignwellness-images.ts
 *
 * Images are saved directly to public/sites/sovereignwellness/ and subdirs.
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { treatments } from "../src/sites/sovereignwellness/data/treatments"
import { dispatches } from "../src/sites/sovereignwellness/data/dispatches"
import { founders } from "../src/sites/sovereignwellness/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/sovereignwellness")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

// Ensure output directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "founders"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "treatments"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "dispatches"), { recursive: true })

// ─── Image Generation Helpers ─────────────────────────────────

async function generateImage(prompt: string, filename: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
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

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

async function generateWithPerson(prompt: string, filename: string, person: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }

  // Get reference photos for this person
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images for ${person}`)
    return
  }
  const photos = fs.readdirSync(personDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2) // Use up to 2 reference photos

  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }

  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    // Convert to File objects with explicit MIME types to avoid octet-stream rejection
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
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

// Small delay to avoid rate limits
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

// ─── Prompts ──────────────────────────────────────────────────

const HERO_PROMPT = "A grand, dimly-lit colonial apothecary hall in founders-era style: dark mahogany shelving lined with amber glass bottles and brass-labeled jars, a large central standing table, a wrought-iron chandelier with lit candles, parchment ledgers open on the table, brass instruments, a wax-seal crest subtly visible on a hanging banner. Muted palette: parchment cream, oxblood, deep navy, muted gold. Painterly, photo-realistic, refined, timeless. No visible text. No people."

const FOUNDER_PROMPTS: Record<"bill" | "brandon" | "jim" | "sean", string> = {
  bill: "Rembrandt-lit oil painting portrait of an elder gentleman with long grey beard, wearing a high white starched collar and a dark oxblood frock coat, standing in a candlelit study with leather-bound books behind him. Painterly, refined, timeless, museum-quality. Dark background. Gilt-frame composition.",
  brandon: "Rembrandt-lit oil painting portrait of a younger clean-shaven gentleman in a dark navy frock coat, high collar, holding a small corked amber glass apothecary bottle. Candlelit, dark background, painterly, museum-quality.",
  jim: "Rembrandt-lit oil painting portrait of a scholarly middle-aged gentleman with spectacles, holding a large leather-bound ledger, standing in front of lamplit wooden shelves of books. Dark navy waistcoat, high collar. Painterly, museum-quality.",
  sean: "Rembrandt-lit oil painting portrait of a composed middle-aged clean-shaven gentleman in a navy waistcoat seated at a writing desk with a quill in hand, oil lamp in the background. Painterly, dark background, museum-quality.",
}

const TREATMENT_PREAMBLE = "Product photography, studio-lit, parchment-cream background with subtle oxblood accents, muted gold label, colonial apothecary aesthetic, painterly-realistic. "

const TREATMENT_SUFFIXES: Record<string, string> = {
  "tincture-no-7": "Amber glass dropper bottle with black rubber bulb, handwritten oxblood-inked label reading 'Tincture No. 7 — VII', wax seal on cap.",
  "cerumen-siphon": "A burnished copper ear siphon instrument laid beside a small amber tincture bottle and a folded cream linen cloth.",
  "anti-blink-pomade": "A small round brass tin with an embossed eye motif on the lid, sitting open to reveal golden beeswax salve.",
  "thirst-reversion-lozenges": "A round brass pastille tin with a hinged lid open, revealing pale sage-green lozenges with a gold imprint.",
  "monday-morning-compound": "Twelve small parchment sachets, tied with waxed oxblood cord, stacked in a worn wooden apothecary drawer.",
  "doorway-amnesia-drops": "A small cobalt-blue glass dropper bottle with a handwritten label and a brass pipette.",
  "tangled-cord-pendant": "A polished brass wax-seal-crested pendant on a braided waxed cord, laid on parchment.",
  "compulsive-agreeableness-elixir": "A tall dark-brown glass apothecary bottle with a bone stopper, oxblood handwritten label, wax seal.",
  "small-talk-inhibitor": "A small round tin of oval chewable troches, ivory-pale with gold emboss, half-open.",
  "bilateral-thumb-fatigue-balm": "A squat amber-glass apothecary jar with a cork stopper, labeled 'BILATERAL THUMB FATIGUE BALM' in oxblood ink, filled with pale amber unguent.",
  "chronic-wednesday-reversal": "Seven small glass vials in a custom fitted walnut case, each numbered I through VII in gold. Vial III has a tiny red band and a tag reading 'DO NOT OPEN WEDNESDAYS'.",
  "spiritual-static-discharge": "A long polished copper rod, a folded ivory linen cloth, and a small dropper bottle laid side by side on parchment.",
  "sneeze-redirection": "A small burnished steel pocket inhaler with a hinged brass cap, laid on parchment.",
  "lost-key-divination-salts": "A linen drawstring pouch half-open, revealing grey-rose mineral salts, on a worn wooden surface.",
  "eye-contact-endurance-drops": "A small cobalt-blue glass dropper bottle with a handwritten label reading 'OCULAR FORTITUDE'.",
  "lunar-transit-malaise-balm": "A matte-black apothecary jar with a gold moon-phase engraving on its lid, half-open revealing deep-blue balm.",
}

const DISPATCH_PROMPTS: Record<string, string> = {
  "the-1962-filing": "Dim archival photograph style, wooden dolly stacked with three unmarked cardboard boxes labeled only with Roman numerals, hallway with period fluorescent tubes, parchment-cream and oxblood palette. Moody, grainy, painterly.",
  "what-they-dont-tell-you-about-your-sweat": "Close crop of a handwritten warning on heavy cream parchment, the words partially visible but mostly blurred, large inky black letters, edges scorched. Dramatic side lighting. Stylized illustration, no legible text.",
  "humility-of-the-dropper": "Still life painting, a single amber-glass dropper bottle with a small pool of tincture suspended at the tip, lit by a candle in a brass holder, on a dark wooden desk. Painterly, Dutch-master aesthetic.",
  "four-gibbous-malaises": "A celestial diagram, ink on parchment, showing four phases of the waning gibbous moon labeled I through IV in gothic lettering, surrounded by hand-drawn botanicals. Sepia, oxblood, muted gold.",
  "why-we-no-longer-answer-the-telephone": "Still life of an old black rotary telephone covered by a folded linen cloth, on a dark wooden desk. A single candle flickers beside it. Painterly, oxblood and navy palette.",
}

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  console.log("\n═══ Sovereign Wellness Co. — Image Generation ═══\n")

  // ── 1. Hero ──
  console.log("🏛  Hero")
  await generateImage(HERO_PROMPT, "hero.png", "1536x1024")
  await delay(2000)

  // ── 2. Founder Portraits ──
  console.log("\n📸 Founder Portraits")
  for (const founder of founders) {
    const prompt = FOUNDER_PROMPTS[founder.baseImage]
    const filename = `founders/${path.basename(founder.portrait)}`
    await generateWithPerson(prompt, filename, founder.baseImage)
    await delay(2000)
  }

  // ── 3. Treatment Products ──
  console.log("\n🧪 Treatment Products")
  for (const treatment of treatments) {
    const suffix = TREATMENT_SUFFIXES[treatment.slug]
    if (!suffix) {
      console.error(`  ✗ ${treatment.slug}: no prompt defined`)
      continue
    }
    const prompt = TREATMENT_PREAMBLE + suffix
    const filename = `treatments/${path.basename(treatment.image)}`
    await generateImage(prompt, filename, "1024x1024")
    await delay(1500)
  }

  // ── 4. Dispatch Heroes ──
  console.log("\n📜 Dispatch Heroes")
  for (const dispatch of dispatches) {
    const prompt = DISPATCH_PROMPTS[dispatch.slug]
    if (!prompt) {
      console.error(`  ✗ ${dispatch.slug}: no prompt defined`)
      continue
    }
    const filename = `dispatches/${path.basename(dispatch.image)}`
    await generateImage(prompt, filename, "1536x1024")
    await delay(1500)
  }

  console.log("\n═══ Done ═══\n")
}

main().catch(console.error)
