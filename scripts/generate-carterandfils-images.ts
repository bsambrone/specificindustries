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

  // ─── 5. Estate Imagery ─────────────────────────────────────────
  console.log("\n🏛  Estate Imagery")

  await generateImage(
    "Wide cinematic photograph of rolling vineyard hills in western Pennsylvania at golden-hour dusk. Neat rows of grapevines sweeping across the foreground. A 19th-century stone winery manor with clay-tile roof sits in the middle distance, warm amber windows lit from inside. CRITICAL DETAIL: on the distant ridge line, just barely visible through a stand of poplar trees, the silhouette of two or three classic steel oil derricks stands against the sunset sky — barely perceptible, almost a trick of the light. Warm, saturated color palette, soft haze, pastoral but with that unmistakable detail on the horizon.",
    "estate-vineyards.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Exterior photograph of a weathered 19th-century stone press building, rectangular with a slate roof and heavy oak door, vines growing up one wall. Part of a small French-style winery estate in the Allegheny foothills. Overcast afternoon light. Subtle detail: the ground around the building has a faint dark patch near the corner, as if something once leaked; weeds grow around it. On the far edge of the frame, through a gap in the trees, a small black steel oil derrick stands quietly in a clearing. Photographic, documentary tone.",
    "estate-press-house.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Geological cross-section illustration showing layered shale bedrock beneath rolling vineyard soil. Top layer: dark topsoil with vine roots reaching down. Middle layers: clay, sandstone. Bottom layers: dense Allegheny shale in dark grey and charcoal tones, with visible striations. CRITICAL DETAIL: within the deepest shale layer, a faint amber-black sheen running in pockets between the strata — hydrocarbon deposits, drawn with geological-textbook precision but understated. Rendered in the style of a 19th-century scientific plate, sepia ink and wash, labeled with tasteful calligraphy in French and English.",
    "estate-terroir.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  // ─── 6. Journal Entry Imagery ──────────────────────────────────
  console.log("\n📝 Journal Entry Imagery")

  await generateImage(
    "Classic still-life composition: an elegant crystal wine decanter on a dark wooden table, being filled from a slender-necked wine bottle held by a gloved hand. Deep amber-black liquid flows from bottle to decanter in a slow ribbon. Warm candlelight, old-master painting style. Subtle detail: the liquid's viscosity is slightly too thick for wine, with the faintest iridescent sheen catching the candlelight. A silver sommelier's tastevin rests nearby on a folded linen. Tasteful, dignified, antique still-life aesthetic.",
    "journal-decanting.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Macro photograph of a wine glass tipped at 30 degrees. Thick liquid coats the inside of the bowl, leaving a long, slow tear — the classic 'legs' of a high-viscosity wine. The tear is unusually slow, almost oil-like in its descent, catching warm backlight. The glass is crystal, on a dark wood surface, with a leather-bound notebook open beside it. The notebook page shows a hand-written viscosity table with columns labeled '0W-20', '5W-30', '10W-40', '20W-50' alongside abbreviated tasting notes. Dignified, documentary, sommelier-study aesthetic.",
    "journal-viscosity.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "A vintage wine glass with dark red wine stands on a low wooden barrier at the edge of a racetrack pit lane at sunset. In the soft-focus background, a classic American muscle car from the 1960s is parked in a pit garage, hood open, gleaming chrome engine visible. Warm golden-hour light, rolling green hills beyond the track. A leather driving glove rests beside the glass. Photographic, cinematic, unhurried.",
    "journal-motorsport-pairing.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Close-up of a hand-sized chunk of dark grey layered shale rock held in a weathered hand above a vineyard row. The rock shows clear horizontal striations. CRITICAL DETAIL: along one of the deeper layers, a thin line of amber-black substance seeps from between the strata, catching the sunlight with an iridescent petroleum sheen. The hand is the hand of a vineyard worker — calloused, stained, unselfconscious. Soft natural daylight, documentary photography style, geological-field-guide composition.",
    "journal-shale.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Interior photograph of an old-world winemaking laboratory bench in a stone-walled room. Glass beakers, Erlenmeyer flasks, rubber-stoppered test tubes, and a brass analytical balance arranged meticulously on a worn oak bench. In the flasks, liquids of varying color and viscosity — amber, crimson, dark green. On the shelves behind: labeled glass bottles with classical apothecary labels reading things like 'DETERGENT', 'DISPERSANT', 'INHIBITOR', 'STABILIZER'. Warm tungsten light. The aesthetic is half-way between 19th-century apothecary and modern chemistry lab — dignified, precise, unapologetic about the science of winemaking.",
    "journal-additives.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  await generateImage(
    "Interior of an old stone wine cellar with wrought-iron racks running the length of the room. Bottles lie on their sides in neat rows, dust undisturbed. SUBTLE DETAIL: toward the back of the cellar, barely visible in the shadow, a small section of the bottle rack has been quietly replaced with a steel shelf holding a row of dark metal drums — about the size of 5-gallon containers, unmarked, stacked neatly. They sit among the wine bottles as if perfectly natural. Warm amber light filtering from a single hanging bulb, heavy shadows, meditative stillness. Wine-cellar photography aesthetic.",
    "journal-storage.png",
    "1536x1024"
  )
  await new Promise(r => setTimeout(r, 1500))

  // ─── 7. Product Bottle Illustrations ───────────────────────────
  console.log("\n🍷 Product Bottle Illustrations")

  function bottlePrompt(p: { name: string; grade: string; varietal: string; category: string }): string {
    const common = [
      `19th-century engraved-style illustration of a French winery bottle, centered in frame.`,
      `The label prominently reads "DOMAINE CARTER & FILS" in classical serif small-caps at the top, "${p.name}" in italic serif beneath, and "${p.grade}" in small-caps at the bottom edge.`,
      `Fine-line illustration with sepia and burnt-umber ink wash over parchment, heraldic wreath motif on the label, no photorealism.`,
      `Catalog-style, old-world, dignified.`,
    ]

    const categorySpecifics: Record<string, string[]> = {
      red: [
        `The bottle is dark burgundy glass with a long classical Bordeaux silhouette, corked with a deep oxblood wax seal at the top.`,
        `Tiny foil stamp near the base reads "SAE ${p.grade}".`,
        `SUBTLE BACKGROUND: the bottle sits on a dim oak-lined cellar shelf; in the soft-focus far corner of the frame, a dark metal drum is stacked, barely visible — it reads as a wine-cellar element at first glance but the drum's industrial shape is unmistakable on closer look.`,
      ],
      white: [
        `The bottle is a tall slim clear-glass bottle with pale amber liquid visible through the glass.`,
        `The cap is a bright yellow screw cap (rather than a cork), which reads as an elegant color choice at first.`,
        `SUBTLE BACKGROUND: the bottle sits on a worn oak workbench; in the soft-focus background, faint outlines of hanging hand tools — spanners, pliers — organized neatly on a pegboard.`,
      ],
      rose: [
        `The bottle is wider at the shoulders than a standard wine bottle, clear glass, with bright pink liquid inside — a distinct silhouette that quietly echoes a coolant container.`,
        `Capped with a short pink wax seal.`,
        `SUBTLE BACKGROUND: the bottle sits on a stone ledge; in the soft-focus background, the outline of an old cast-iron radiator stands against a whitewashed wall.`,
      ],
      sparkling: [
        `The bottle is a classical champagne shape with a deep punt, dark glass, and a wire muselet cage over the cork.`,
        `DETAIL: the wire cage is woven in a distinctive pattern that resembles brake-line fittings and banjo bolts.`,
        `SUBTLE BACKGROUND: the bottle stands on a checkered tile floor; in the soft-focus background, the faint outlines of a tiled shop wall with a calendar and a pegboard.`,
      ],
      dessert: [
        `The bottle is a 375ml half-bottle in amber glass with viscous golden liquid, sealed with a short copper foil.`,
        `Label reads with a small italic annotation "DEXRON VI" beneath the varietal name.`,
        `SUBTLE BACKGROUND: the bottle sits on a wooden crate; in the soft-focus background, the outline of a transmission case on a workbench beyond.`,
      ],
      "vinho-verde": [
        `The bottle is slim and tall, pale green glass, with bright blue-green liquid inside, sealed with a royal-blue wax cap.`,
        `SUBTLE BACKGROUND: the bottle sits on a frosted windowsill in winter light; in the soft-focus background, the outline of a garage door frame and frost patterns on the glass.`,
      ],
    }

    return [...common, ...(categorySpecifics[p.category] ?? [])].join(" ")
  }

  for (const product of products) {
    const filename = product.image.replace("/sites/carterandfils/", "")
    await generateImage(bottlePrompt(product), filename, "1024x1024")
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log("\n═══ Done ═══\n")
}

main().catch(console.error)
