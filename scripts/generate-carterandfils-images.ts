/**
 * Batch image generator for Carter & Fils Vineyard site.
 * Uses OpenAI's gpt-image-1 model to generate hero, executive portrait, and product bottle images.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-carterandfils-images.ts
 *
 * Images are saved directly to public/sites/carterandfils/
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { products } from "../src/sites/carterandfils/data/products"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/carterandfils")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

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

// ─── Image Definitions ────────────────────────────────────────

async function main() {
  console.log("\n═══ Carter & Fils Vineyard — Image Generation ═══\n")

  // ── 1. Hero ──
  console.log("🏞 Hero")
  await generateImage(
    "Widescreen landscape photograph of rolling Allegheny vineyard rows at golden hour. A 19th-century stone winery manor sits in the middle distance, its warm amber light glowing from tall arched windows. The sky is streaked with amber and deep ochre. At the far edge of the scene, through a line of old-growth trees on the distant ridge, the faint silhouette of a single oil derrick is just barely visible against the dusky sky — subtle, almost hidden. Cinematic, painterly quality. No text.",
    "hero.png",
    "1536x1024"
  )
  await delay(2000)

  // ── 2. Executive Portraits ──
  console.log("\n📸 Executive Portraits")

  await generateWithPerson(
    "Portrait of this person as Étienne Carter, a 50-year-old seventh-generation French-American winemaker. He is wearing a tweed blazer over a dark shirt, slightly disheveled from cellar work. Standing in front of rolling vineyards at dusk, bathed in soft amber natural light. Dignified but working-class poise. Subtle detail: a dark smudge visible on his left cuff from cellar work. Shot at portrait-studio quality. No text.",
    "exec-carter.png",
    "bill"
  )
  await delay(2000)

  await generateWithPerson(
    "Portrait of this person as Rémi Dumoulin, a 45-year-old Cellar Master. He is wearing a canvas apron over work clothes and holding a wine pipette — a long glass siphon used for sampling from barrels. The background is a dim oak-barrel cellar; several barrels have faded white stenciled markings including numeric codes like '10W-40' and '5W-30'. Ambient warm low light. Thoughtful expression. No text.",
    "exec-dumoulin.png",
    "brandon"
  )
  await delay(2000)

  await generateWithPerson(
    "Portrait of this person as Archibald Whitford, a distinguished British Chief Sommelier in his late 50s. He is wearing a formal tuxedo with a small silver taste-vin on a chain around his neck. He is holding a wine glass tipped at about 30 degrees; the liquid inside reads as a very dark red, almost black, catching no light. Background of old leather-bound books on shelves. Dignified, slightly severe expression. No text.",
    "exec-whitford.png",
    "jim"
  )
  await delay(2000)

  await generateWithPerson(
    "Portrait of this person as Laurent Beaufort, a 55-year-old Director of Terroir & Vineyard Operations. He is wearing a weathered tweed field jacket and muddy rubber boots, standing at the edge of a rolling Pennsylvania vineyard. On the distant ridge behind him, through a line of poplar trees, a silhouette of oil derricks is just barely visible. Overcast daylight, contemplative expression, hands in pockets. No text.",
    "exec-beaufort.png",
    "sean"
  )
  await delay(2000)

  // ── 3. Favicon ──
  console.log("\n🔖 Favicon")

  const faviconPath = path.join(OUTPUT_DIR, "favicon.png")
  const faviconSourcePath = path.join(OUTPUT_DIR, "favicon-source.png")

  if (fs.existsSync(faviconPath)) {
    console.log("  ⏭ favicon.png (already exists)")
  } else {
    // Generate high-res source crest at 1024x1024
    if (!fs.existsSync(faviconSourcePath)) {
      console.log("  🎨 Generating favicon-source.png (1024x1024)...")
      try {
        const response = await openai.images.generate({
          model: "gpt-image-1",
          prompt: "A simple heraldic monogram crest. Intertwined letters 'C·F' in classical serif typography, centered within a symmetrical laurel wreath. Deep oxblood red letterforms on a parchment cream background, with hints of brushed copper in the laurel leaves. Minimal, flat, heraldic style. No other text or decorative borders. Square composition.",
          n: 1,
          size: "1024x1024",
          quality: "medium",
        })

        const imageData = response.data[0]
        if (imageData.b64_json) {
          fs.writeFileSync(faviconSourcePath, Buffer.from(imageData.b64_json, "base64"))
        } else if (imageData.url) {
          const res = await fetch(imageData.url)
          const buffer = Buffer.from(await res.arrayBuffer())
          fs.writeFileSync(faviconSourcePath, buffer)
        }
        console.log("  ✓ favicon-source.png")
      } catch (err: any) {
        console.error(`  ✗ favicon-source.png: ${err.message}`)
        return
      }
    } else {
      console.log("  ⏭ favicon-source.png (already exists)")
    }

    // Resize to 64x64
    console.log("  📐 Resizing favicon to 64x64...")
    try {
      await sharp(faviconSourcePath)
        .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(faviconPath)
      console.log("  ✓ favicon.png (64x64)")
    } catch (err: any) {
      console.error(`  ✗ favicon.png resize failed: ${err.message}`)
    }
  }

  // ── 4. Product Bottle Illustrations ──
  console.log("\n🍾 Product Bottle Illustrations")

  function bottlePrompt(p: { name: string; grade: string; varietal: string; category: string }): string {
    return [
      "Elegant 19th-century engraved-style illustration of a French winery bottle, centered on a pale parchment-cream background.",
      "The bottle is dark burgundy glass with subtle highlights, corked, with a wax-seal at the top.",
      `The label reads "DOMAINE CARTER & FILS" in classical serif small-caps type at the top, with "${p.name}" in a tasteful italic serif beneath, and "${p.grade}" in small caps at the bottom edge of the label.`,
      "Fine-line illustration style, sepia and burnt-umber ink wash over parchment, heraldic wreath motif, no photorealism.",
      "Minimal, old-world, catalog-style, no shadows beneath, no surrounding scenery, just the bottle.",
    ].join(" ")
  }

  for (const product of products) {
    // Strip the leading "/sites/carterandfils/" to get just the filename
    const filename = product.image.replace("/sites/carterandfils/", "")
    try {
      await generateImage(bottlePrompt(product), filename)
    } catch (err: any) {
      console.error(`  ✗ ${filename}: ${err.message}`)
    }
    await delay(1500)
  }

  console.log("\n═══ Done ═══\n")
}

main().catch(console.error)
