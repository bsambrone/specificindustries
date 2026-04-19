/**
 * Batch image generator for the Whitford Family Chunky Milk site.
 * Generates hero, one shed interior, hand-drawn hollow map, 4 portraits
 * (with person reference images), and 15 product shots.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-chunkymilk-images.ts
 *
 * Images saved to public/sites/chunkymilk/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/chunkymilk/data/products"
import { leaders } from "../src/sites/chunkymilk/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/chunkymilk")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "portraits"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "products"), { recursive: true })

const HOLLOW_STYLE =
  "misty Appalachian hollow morning, weathered wood planks, deep moss greens and aged walnut browns, warm off-cream tones, shallow depth of field, dim natural daylight, no chrome, no plastic, ceramic and stoneware and glass, tintype-adjacent color grading"

async function generateImage(
  prompt: string,
  filename: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
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
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

async function generateWithPerson(
  prompt: string,
  filename: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
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
      }),
    )
    const response = await openai.images.edit({
      model: "gpt-image-1",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: inputImages as any,
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
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

// -------- Hero, shed, map, favicon --------

async function generateScenery() {
  console.log("\n📸 Hero + scenery")

  await generateImage(
    `Wide shot of a weathered wooden plank surface at dawn in an Appalachian hollow. Three ceramic jars with chunky white milk and waxed cork stoppers sit in a row on the planks. Misty green forest behind. Small sprig of wildflowers to the side. ${HOLLOW_STYLE}. Photorealistic, landscape format, moody and warm, editorial composition.`,
    "hero.png",
    "1536x1024",
  )

  await generateImage(
    `Interior of an old unpainted wooden settling shed at dusk, lit by a single oil lamp on a workbench. Wooden shelves along the walls hold dozens of ceramic and stoneware jars of chunky milk in rows. Waxed cork stoppers. Rough-hewn plank floor. A wooden stool in the foreground. ${HOLLOW_STYLE}. Warm lamp light, deep shadows, photorealistic.`,
    "settlin-shed.png",
    "1536x1024",
  )

  await generateImage(
    `Hand-drawn ink-and-wash map on aged cream paper, showing a small Appalachian hollow. Labeled locations: "North Field" (upper right), "Sycamore Field" (center, with three small sycamore trees), "Creek Bottom" (lower left, with a winding creek), "High Meadow" (upper left), "Settlin' Shed" (small building near center), "Chunk Rock" (small boulder at the top), "Family Cemetery" (small stone-walled plot). A dirt road winds through. Handwritten labels in a 19th-century rustic cursive. Browns, muted greens, and sepia inks only. Compass rose in the corner. Aged paper texture.`,
    "our-hollow-map.png",
    "1536x1024",
  )

  await generateImage(
    `Circular logo crest on cream parchment background. A simple line-art ceramic jar with three visible chunks inside (round blobs). Arching text above reads "WHITFORD". Arching text below reads "CHUNKY MILK". Centered below the jar, small text reads "EST. 1867". Walnut brown line-art only, no color fills. Vintage hand-drawn feel. Square composition with the crest centered.`,
    "favicon.png",
  )
}

// -------- Portraits --------

async function generatePortraits() {
  console.log("\n👤 Portraits")

  const portraitPrompts: Record<string, string> = {
    bill:
      `Color tintype-style portrait of an older Appalachian hollow dairyman with a full grey beard. He wears suspenders over a collarless linen shirt and a flat cap. Standing beside a weathered wooden barn door, misty morning light behind him. Shallow depth of field. Serious, weathered face. Hands at sides. 3/4 pose. ${HOLLOW_STYLE}. Vintage photographic color grading, not black and white.`,
    brandon:
      `Color tintype-style portrait of a middle-aged Appalachian hollow dairyman with a dark beard and work-worn hands. He holds a stoneware crock against his chest. Denim work shirt rolled at the sleeves. Wooden pegboard with ceramic tasting cups hanging behind him. Warm afternoon light from a side window. ${HOLLOW_STYLE}. 3/4 pose, direct gaze, vintage photographic color grading.`,
    jim:
      `Color tintype-style portrait of a stoic older Appalachian hollow keeper with a long greying beard and a worn leather vest over a dark shirt. He holds a large ring of old brass keys. Standing inside a dim wooden settling shed with shelves of ceramic jars behind him, lit by a single oil lamp. Deep shadows. ${HOLLOW_STYLE}. Serious expression, direct gaze, vintage photographic color grading.`,
    sean:
      `Color tintype-style portrait of a steward with a short-cropped beard, wearing a flannel shirt under a canvas work coat. Standing outdoors in tall grass with a wooden walking staff, morning fog in the background, blue-grey light. Quiet, observant expression, direct gaze. ${HOLLOW_STYLE}. Vintage photographic color grading.`,
  }

  for (const leader of leaders) {
    const filename = `portraits/${leader.portraitImage.split("/").pop()}`
    const prompt = portraitPrompts[leader.person]
    if (!prompt) {
      console.error(`  ✗ ${filename}: no prompt for person "${leader.person}"`)
      continue
    }
    await generateWithPerson(prompt, filename, leader.person)
  }
}

// -------- Products --------

async function generateProducts() {
  console.log("\n🍾 Products")

  const productPrompts: Record<string, string> = {
    "petite-stir":
      `A single one-quart ceramic jar of chunky milk on weathered wood planks, waxed cork stopper, small handwritten label reading "Petite Stir". A few small loose white chunks visible through the glass portion of the jar. Morning light. ${HOLLOW_STYLE}. Centered, editorial product photography.`,
    "hollow-draw":
      `A single one-quart ceramic jar of chunky milk, waxed cork stopper, handwritten label "Hollow Draw". Medium-sized white chunks suspended in the milk. On a dark wooden table with a sprig of wildflowers beside it. ${HOLLOW_STYLE}.`,
    "settled-hearth":
      `A single one-quart ceramic jar of chunky milk, waxed cork stopper, handwritten label "Settled Hearth". Large firm white chunks visible, some sitting at the bottom like stones. Beside a thick slice of dark bread on a wooden cutting board. Dim warm firelight. ${HOLLOW_STYLE}.`,
    "monumental-gather":
      `A single tall ceramic jar of chunky milk, wide opening with waxed cork stopper, handwritten label "Monumental Gather". Very large architectural white chunks — at least four clearly visible, each the size of an egg. On a linen cloth beside two ceramic tasting cups. Ceremonial composition. ${HOLLOW_STYLE}.`,
    "patriarch-reserve":
      `A single aged ceramic jar with a wax seal and a small handwritten paper tag that reads "Patriarch Reserve". Resting on a wooden shelf inside a dim settling shed, other jars behind it out of focus. Oil-lamp light. Very old, revered. ${HOLLOW_STYLE}.`,
    "foundation-blend":
      `Two small half-quart ceramic jars side by side on weathered wood, tied together with unbleached muslin ribbon. Handwritten labels read "Petite Stir" and "Hollow Draw". Both have waxed cork stoppers. Small chunks visible in each. ${HOLLOW_STYLE}.`,
    "cottage-pour":
      `A single wide-mouth ceramic jar of chunky milk, the contents densely packed with many small white curdy clusters suspended in liquid — clearly dense and clustered, not smooth. Waxed cork stopper, handwritten label "The Cottage Pour". On a weathered wood surface with a ceramic spoon beside it. ${HOLLOW_STYLE}.`,
    "chunk-scoop":
      `A hand-thrown ceramic scoop with a notched wooden handle, finished with a walnut brown drip glaze on a cream body. Resting on an unbleached linen cloth on weathered wood planks. Side-on product shot. ${HOLLOW_STYLE}.`,
    "whitford-cloth":
      `A folded square of unbleached muslin cloth with a single hand-stitched "W" monogram in the corner, resting on aged wood. Simple, quiet composition. Overhead shot. ${HOLLOW_STYLE}.`,
    "settling-crock":
      `A large two-gallon glazed stoneware crock with a wooden lid, sitting on a wooden bench in a settling shed. Warm lamp light from the side. Deep, earthy glaze. Single hero shot. ${HOLLOW_STYLE}.`,
    "tasting-cups":
      `A matched pair of small ceramic tasting cups, each with a notched rim, finished in walnut drip glaze on cream. Sitting side by side on a wooden table. ${HOLLOW_STYLE}.`,
    "hollow-journal":
      `A waxed leather notebook, cover slightly scuffed, with a cotton ribbon marker hanging out the bottom. Resting closed on aged wood planks beside an ink pen. Warm natural light. ${HOLLOW_STYLE}.`,
    "newcomer-gift":
      `A small gift arrangement on weathered wood: one small ceramic jar of chunky milk (labeled "Petite Stir"), one folded unbleached muslin cloth, one small ceramic tasting cup, all wrapped together with hemp twine and a small hand-written card. ${HOLLOW_STYLE}.`,
    "homestead-gift":
      `A wooden crate on weathered planks holding two ceramic jars of chunky milk (labeled "Hollow Draw" and "Settled Hearth"), a ceramic scoop, a folded muslin cloth, and a waxed leather journal. Hemp twine wrapped around the crate. ${HOLLOW_STYLE}.`,
    "patriarch-gift":
      `An unfinished oak crate on weathered wood, holding a large ceramic jar marked "Patriarch Reserve" with a wax seal, a large glazed stoneware settling crock, and a waxed leather journal. Solemn, heirloom composition. ${HOLLOW_STYLE}.`,
  }

  for (const product of products) {
    const filename = `products/${product.slug}.png`
    const prompt = productPrompts[product.slug]
    if (!prompt) {
      console.error(`  ✗ ${filename}: no prompt for slug "${product.slug}"`)
      continue
    }
    await generateImage(prompt, filename)
  }
}

// -------- Main --------

async function main() {
  console.log("🏔️  Whitford Family Chunky Milk — image generation\n")
  await generateScenery()
  await generatePortraits()
  await generateProducts()
  console.log("\n✅ Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
