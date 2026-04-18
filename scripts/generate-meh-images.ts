/**
 * Batch image generator for the Meh. site.
 * Generates hero, 16 product photos, 4 exec portraits, and favicon.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-meh-images.ts
 *
 * Images saved to public/sites/meh/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/meh/data/products"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/meh")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ─── Helpers (adapted from generate-carterandfils-images.ts) ───

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
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${message}`)
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
        const mime =
          ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"
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
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${message}`)
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Prompt constants ─────────────────────────────────────────

const BASE_STYLE =
  "flat medium-gray studio background, even soft diffuse lighting, no props, no hands, no humans, grayscale and neutral palette, brutalist product photography, emotionally neutral, centered composition, minimalist, photographed straight on or at a slight three-quarter angle"

const PRODUCT_PROMPTS: Record<string, string> = {
  "beige-mood-ring":
    "A classic gold-banded mood ring with an opaque matte beige oval stone, photographed alone",
  "late-bell":
    "A square wireless doorbell button with a thin chrome bezel, a single centered press plate, and a small speaker grille, mounted flat on a neutral gray surface",
  "are-you-sure-clock":
    "A small rectangular matte steel bedside alarm clock with a dark grayscale digital display reading '6:30 AM', a single discreet speaker grille, and one small button on top",
  "whistler-zero":
    "An electric stainless-steel kettle with a matte dusty-gray exterior, a short gooseneck spout, a black plastic handle, and a cordless base",
  "monotone-speaker":
    "A tall cylindrical smart speaker with a woven fabric gray mesh exterior and a single thin white light ring around the top, standing upright",
  "affection-plush":
    "A medium-sized teddy bear made entirely of soft gray plush, seated upright with arms slightly spread, facing directly forward, black-bead eyes and a small embroidered nose",
  "motivational-frame":
    "A small rectangular digital picture frame with a slim dark charcoal bezel, displaying a completely blank light-gray screen, resting on a small integrated easel stand",
  "tamagoldi":
    "A small egg-shaped digital pet device in matte gray plastic with a keychain ring at the top and a small rectangular LCD face in the center showing a simple pixelated pet character",
  "oh-humidifier":
    "A medium cylindrical cool-mist humidifier in matte gray plastic with a top-mounted mist nozzle and a thin seam around the middle where the water tank separates",
  "dimmer-lamp":
    "A minimalist desk reading lamp with a thin matte-gray adjustable arm and a cone-shaped shade, shown in profile, its warm bulb visible",
  "absence-mister":
    "A small cylindrical gray plant-misting device about the size of a mug, with a subtle black motion-sensor dot on the front and a fine-mist nozzle on top",
  "memory-purifier":
    "A tall cylindrical HEPA air purifier in matte gray with a top-mounted vent grille and a minimal control panel on the front, standing upright",
  "about-right-scale":
    "A square bathroom scale with a matte toughened-glass top surface and a small embedded display showing the text 'YEAH, THAT\\'S ABOUT RIGHT.' in thin sans-serif, photographed from a slight three-quarter overhead angle",
  "minimum-motion-tracker":
    "A wrist-worn fitness tracker with a soft medium-gray silicone strap laid flat on the surface, with a small rectangular grayscale display on the face showing faint text",
  "familiar-mirror":
    "A rectangular wall-mounted smart mirror with a thin charcoal frame, shown straight on with the reflection soft and indistinct, a faint thin line of text glowing along the lower inner edge",
  "congratulations-printer":
    "A small desktop thermal printer in matte gray with a top paper slot, a single round button on the front panel, and a partially-fed small gray card emerging from the top",
}

const EXEC_PROMPT =
  "Transform the reference subject into a grayscale corporate headshot of a middle-aged man, shown from shoulders up against a neutral medium-gray studio backdrop. He is wearing a plain charcoal suit jacket over a white shirt and a muted gray tie. His expression is neutral and quietly resigned — not smiling, not frowning, eyes level with camera. Soft diffuse studio lighting. Shallow depth of field. Matte desaturated grayscale palette, minimal contrast. Preserve his facial features exactly."

async function main() {
  console.log("\n═══ Meh. — Image Generation ═══\n")

  // Hero
  console.log("🏞 Hero")
  await generateImage(
    `A single medium-sized ultrasonic humidifier with a matte gray cylindrical body and a top mist nozzle, centered on a flat medium-gray studio surface with a softly gradient gray seamless backdrop. Wide landscape composition, empty negative space on either side. ${BASE_STYLE}.`,
    "hero.png",
    "1536x1024"
  )
  await delay(2000)

  // Products
  console.log("\n📦 Products")
  for (const product of products) {
    const specific = PRODUCT_PROMPTS[product.slug]
    if (!specific) {
      console.warn(`  ⚠ no prompt for ${product.slug}`)
      continue
    }
    await generateImage(
      `${specific}. ${BASE_STYLE}. No text except as described.`,
      `product-${product.slug}.png`,
      "1024x1024"
    )
    await delay(1500)
  }

  // Execs
  console.log("\n📸 Executive Portraits")
  const execs: Array<{ person: string; filename: string }> = [
    { person: "bill", filename: "team-founder.png" },
    { person: "brandon", filename: "team-president.png" },
    { person: "jim", filename: "team-vp.png" },
    { person: "sean", filename: "team-ambient.png" },
  ]
  for (const exec of execs) {
    await generateWithPerson(EXEC_PROMPT, exec.filename, exec.person, "1024x1024")
    await delay(2000)
  }

  // Favicon
  console.log("\n🔖 Favicon")
  await generateImage(
    "A square favicon showing a lowercase 'meh.' in bold black sans-serif type, centered on a flat medium-gray square background, crisp vector-like edges, no other elements, no drop shadow, high contrast between the black text and the gray background.",
    "favicon.png",
    "1024x1024"
  )

  console.log("\n✅ Done.\n")
}

main()
