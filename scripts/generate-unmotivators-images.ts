/**
 * Generate all Unmotivators Inc. images.
 *
 * Usage:  npx tsx scripts/generate-unmotivators-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/unmotivators/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { products } from "../src/sites/unmotivators/data/products"
import { leaders } from "../src/sites/unmotivators/data/leadership"

const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/unmotivators")
const PRODUCTS_DIR = path.join(OUT_DIR, "products")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(PRODUCTS_DIR, { recursive: true })
mkdirSync(LEADERS_DIR, { recursive: true })

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name)
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const shuffled = [...files].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((f) => path.join(dir, f))
}

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  console.log(`  GEN   ${filename} ...`)
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size,
    quality: "high",
  })
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  const photos = getPersonPhotos(person)
  console.log(`  GEN   ${filename} (person: ${person}) ...`)
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  }
  const files = await Promise.all(
    photos.map(async (p) => {
      const ext = path.extname(p).toLowerCase()
      return toFile(readFileSync(p), path.basename(p), { type: mimeTypes[ext] ?? "image/jpeg" })
    }),
  )
  const response = await (openai.images as any).edit({
    model: "gpt-image-1",
    image: files,
    prompt,
    size,
    quality: "high",
  })
  const b64 = response.data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

const STYLE_BASE =
  "Overall aesthetic: fluorescent office gray, dingy beige-gray walls, muted palette, shallow depth of field, photographed under cool fluorescent lighting. Neutral, somber, corporate-documentary style. No people unless specified. No bright colors except muted brick red accents. No text overlays unless the product itself contains text."

function promptForProduct(p: (typeof products)[number]): string {
  switch (p.productType) {
    case "poster":
      return `${STYLE_BASE} A framed demotivational poster photographed on a neutral beige-gray office wall. The poster has a thin black frame and a wide off-white matte. The image inside the matte is a single understated photograph (e.g., a lone empty chair, a dying plant, a cold cup of coffee, an unoccupied cubicle, a fluorescent light fixture). At the bottom of the matte, one bold word in uppercase condensed sans-serif reads "${p.name}". Below that, in smaller italic serif, reads "${p.subtitle}". The image should look like a real photograph of a hanging poster, not a graphic design export.`
    case "mug":
      return `${STYLE_BASE} Product photography of a single ceramic coffee mug sitting on a beige office desk. The mug is white or neutral gray, 14oz, with a simple minimalist design element referencing "${p.name}". Shot slightly above eye level. A blurred keyboard and stack of papers are visible in the background.`
    case "plaque":
      return `${STYLE_BASE} Product photography of a single rectangular engraved wooden plaque, approximately 8 by 3 inches, on a walnut base with a brass engraving plate. The plate is engraved with the text "${p.name}". The plaque sits on a beige office desk corner. Neutral, somber lighting.`
    case "paper":
      return `${STYLE_BASE} Flat-lay product photography of a stationery item referencing "${p.name}". The item is photographed from directly above on a beige office desk surface, with a single ballpoint pen and a faint coffee ring visible at the edge of the frame. Muted, documentary style.`
    case "award":
      return `${STYLE_BASE} Product photography of a trophy or award referencing "${p.name}". The award sits on a beige office desk, photographed slightly above eye level. The award has a gold-plated or crystal finish. Muted lighting, shallow depth of field.`
    case "desktoy":
      return `${STYLE_BASE} Product photography of a small desk toy or stress item referencing "${p.name}". The item sits slightly askew on the corner of a beige office desk. A blurred mouse and keyboard are visible in the background.`
    case "supply":
      return `${STYLE_BASE} Product photography of an office supply item referencing "${p.name}". The item is photographed on a beige office desk. Muted palette, documentary style.`
    case "homedecor":
      return `${STYLE_BASE.replace("fluorescent office gray", "beige home interior")} Product photography of a home-decor item referencing "${p.name}" in the style of farmhouse or rustic decor. The item is photographed in a neutral beige living room or kitchen setting, with muted lighting. The color palette is continuous with the office aesthetic but softer.`
  }
}

function promptForLeader(leader: (typeof leaders)[number]): string {
  return `Black-and-white corporate headshot photograph of a middle-aged man. Washed-out lighting, thousand-yard stare, slightly tired expression. Cheap gray office backdrop or wall behind him. He wears a plain solid-color polo or button-down. Shoulders up, straight-on composition. Documentary style, not glamorous, not flattering. Slight vignetting. No props. No caption.`
}

const HERO_PROMPT = `${STYLE_BASE} An empty gray fabric-walled office cubicle photographed from behind an unoccupied ergonomic office chair. Fluorescent overhead lighting, drop-ceiling tiles, a beige desk with a dim monitor. A single unframed demotivational poster leans diagonally against the cubicle partition. The scene is quiet, dim, slightly depressing. Wide-angle composition, 4:3 aspect ratio.`

async function main() {
  console.log("Generating Unmotivators Inc. imagery...\n")

  // Hero
  console.log("Hero:")
  await generateImage("hero.png", HERO_PROMPT, "1536x1024")

  // Leaders
  console.log("\nLeadership portraits:")
  for (const leader of leaders) {
    await generateImageWithPerson(
      `${leader.slug}.png`,
      promptForLeader(leader),
      leader.person,
      "1024x1024",
      LEADERS_DIR,
    )
  }

  // Products
  console.log("\nProducts:")
  for (const product of products) {
    await generateImage(
      `${product.slug}.png`,
      promptForProduct(product),
      "1024x1024",
      PRODUCTS_DIR,
    )
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
