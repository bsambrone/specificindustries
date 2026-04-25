/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generate all Boom-Fun! Toy Company images.
 *
 * Usage:  npx tsx scripts/generate-boomfun-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/boomfun/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/boomfun")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const PRODUCTS_DIR = path.join(OUT_DIR, "products")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(LEADERS_DIR, { recursive: true })
mkdirSync(PRODUCTS_DIR, { recursive: true })

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

async function generatePortrait(
  filename: string,
  person: string,
  prompt: string,
) {
  const outPath = path.join(LEADERS_DIR, path.basename(filename))
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  const photos = getPersonPhotos(person, 2)
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
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: files,
    prompt,
    size: "1024x1024",
    quality: "high",
  } as any)
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

// ---------------------------------------------------------------------------
// Hero / brand prompts
// ---------------------------------------------------------------------------

const heroPrompt = {
  filename: "hero.png",
  prompt:
    "A vintage 1961 American toy catalog hero scene, painted in the style of a Sears Christmas Wish Book cover. A wholesome suburban family of four — father in a cardigan, mother in a cream-colored apron, a 9-year-old boy and a 7-year-old girl — gathered in a sunlit backyard around a large red and gold gift box stamped 'BOOM-FUN!' The box is open to reveal colorful product shapes inside. Behind them: a clapboard house, a picket fence, an American flag. The scene is lit in warm afternoon sunlight, with a slightly faded mid-century color palette: cream, rich red, burnt orange, soft navy. Illustrated, not photographic. Wholesome, cheerful, 1961 advertising aesthetic.",
}

const faviconPrompt = {
  filename: "favicon.png",
  prompt:
    "A simple 1960s toy catalog brand mark: a bright red starburst shape with the word 'BOOM!' in bold chunky slab-serif lettering across the center. Solid cream background. Flat illustration, high contrast, reads clearly at small sizes. No outer frame, no text below. Just the starburst and the word.",
}

const sparkyPrompt = {
  filename: "sparky.png",
  prompt:
    "Mid-century cartoon mascot character: an anthropomorphic stick of red dynamite with a friendly smiling face, wearing a small yellow safety helmet, giving a two-thumbs-up gesture. Arms and legs are thin black rubber-hose style. Bright friendly eyes, wide smile. Cream background. Illustrated in a 1961 Hanna-Barbera / advertising mascot style — simple flat shapes, clean outlines, cheerful. No text. The character is labeled with a small 'SAFETY' patch on the helmet.",
}

// ---------------------------------------------------------------------------
// Product prompts
// ---------------------------------------------------------------------------

const productPrompts = [
  {
    filename: "products/glitter-claymore.png",
    prompt:
      "A 1961 toy catalog product photo of a directional mine-shaped toy called the 'Glitter Claymore' — a curved green metal body labeled 'FRONT TOWARD FUN' on one face, sitting on small folding legs. No real explosives visible; clearly a toy. Rainbow glitter spilling from the front face as decorative flourish. Cream background, soft shadow, mid-century catalog style, flat lighting, no text overlay.",
  },
  {
    filename: "products/dynamite-fishing-kit.png",
    prompt:
      "A 1961 toy catalog product photo of the 'Junior Dynamite Fishing Kit' — a rectangular brown waxed-cardboard box, open, displaying four cartoon quarter-stick toy charges labeled 'BF-204,' a coil of multicolored fuse, and a small canvas creel bag. Cream background, soft shadow, flat catalog lighting. Cheerful and wholesome.",
  },
  {
    filename: "products/mailbox-firecracker.png",
    prompt:
      "A 1961 toy catalog product photo of the 'Friendly Mailbox Greeting Firecracker' — a small bright red paper-wrapped tube roughly 3 inches long, resting next to an open curbside mailbox. Rainbow paper confetti scattered around. Cream background, soft shadow, mid-century catalog style, flat lighting.",
  },
  {
    filename: "products/tree-stump-remover.png",
    prompt:
      "A 1961 toy catalog product photo of the 'Young Landscaper's Tree-Stump Remover' kit — a wooden plunger detonator with a brass plate, coiled wire spool, and six small paper-wrapped cartoon toy charges arranged around it on a cream background. Mid-century catalog style, soft shadow, flat lighting, cheerful.",
  },
  {
    filename: "products/pocket-fuse-assortment.png",
    prompt:
      "A 1961 toy catalog product photo of a shallow round metal tin labeled 'BOOM-FUN! RAINBOW FUSE ASSORTMENT — 50 PACK' with a smiling cartoon dynamite-mascot character illustrated on the lid. Tin is open on a cream background with several coils of colored paper fuse visible inside — red, orange, yellow, green, blue, purple. Mid-century catalog style, soft shadow.",
  },
  {
    filename: "products/blasting-cap-lunchbox.png",
    prompt:
      "A 1961 toy catalog product photo of a pressed-tin children's lunchbox in rich red and cream, lithographed on the top face with an illustrated scene of a wholesome 1961 backyard birthday party featuring the Boom-Fun! brand. Carrying handle on top. Matching red thermos standing next to it. Cream background, soft shadow, flat catalog lighting, mid-century style.",
  },
  {
    filename: "products/sparky-safety-handbook.png",
    prompt:
      "A 1961 toy catalog product photo of a small staple-bound children's pocket booklet titled 'SPARKY'S SAFETY HANDBOOK FOR YOUNG DETONATORS' — bright two-color cover (red and cream) showing the Sparky mascot character (a smiling anthropomorphic stick of dynamite with a yellow safety helmet) giving a thumbs-up. 32 pages, brass staple binding visible. Cream background, soft shadow, mid-century catalog style.",
  },
  {
    filename: "products/glitter-confetti-mortar.png",
    prompt:
      "A 1961 toy catalog product photo of the 'Glitter Confetti Aerial Mortar' — a 7-inch-diameter brass-plated steel tube standing vertically on a square cast-iron baseplate. A coiled paper fuse sticks out of the top. Three small labeled cartridge tubes in red, green, and blue arranged on the cream background beside it. Cream background, soft shadow, flat mid-century catalog lighting.",
  },
]

// ---------------------------------------------------------------------------
// Portrait prompts
// ---------------------------------------------------------------------------

const portraitCommonPrefix =
  "A 1961 corporate American executive portrait in the Mad Men era style. Subject wears a dark navy suit, white shirt, skinny black tie, horn-rimmed glasses (optional). Short 1961-era haircut. Background is a wood-paneled Toledo, Ohio executive office — warm browns, muted lighting, bookshelves with ledgers visible. Three-quarter-length framing, subject standing or seated at a mahogany desk with a single ashtray and a green banker's lamp. Retain the facial features of the reference subject exactly — this is a portrait of the same person in a different era. Serious but not unfriendly expression. Illustrated in a realistic painted-photograph style with slight mid-century color palette."

const portraitPrompts = [
  {
    filename: "leaders/founder.png",
    person: "bill",
    adjustment:
      "The nameplate on the desk reads 'HARLAND P. CRENSHAW — FOUNDER.' Subject is seated behind the desk, both hands visible, wearing a Boom-Fun! enamel lapel pin.",
  },
  {
    filename: "leaders/president.png",
    person: "brandon",
    adjustment:
      "The nameplate on the desk reads 'EARL WHITFIELD III — PRESIDENT.' Subject is standing beside the desk, one hand resting on a framed Boom-Fun! catalog page. Neatly trimmed auburn beard.",
  },
  {
    filename: "leaders/research.png",
    person: "jim",
    adjustment:
      "The nameplate on the desk reads 'DONOVAN PRYCE — HEAD OF RESEARCH.' Subject is seated, holding a blueprint. Bald with a neatly-trimmed dark beard.",
  },
  {
    filename: "leaders/parental-outreach.png",
    person: "sean",
    adjustment:
      "The nameplate on the desk reads 'MERRITT HALBERD — VP OF PARENTAL OUTREACH.' Subject stands, clean-shaven, holding a typewritten letter in one hand.",
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n— Hero —")
  await generateImage(heroPrompt.filename, heroPrompt.prompt, "1536x1024", OUT_DIR)

  console.log("\n— Favicon —")
  await generateImage(faviconPrompt.filename, faviconPrompt.prompt, "1024x1024", OUT_DIR)

  console.log("\n— Mascot —")
  await generateImage(sparkyPrompt.filename, sparkyPrompt.prompt, "1024x1024", OUT_DIR)

  console.log("\n— Product images —")
  for (const { filename, prompt } of productPrompts) {
    await generateImage(path.basename(filename), prompt, "1024x1024", PRODUCTS_DIR)
  }

  console.log("\n— Leader portraits —")
  for (const { filename, person, adjustment } of portraitPrompts) {
    const fullPrompt = `${portraitCommonPrefix} ${adjustment}`
    await generatePortrait(filename, person, fullPrompt)
  }

  console.log("\nAll images generated.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
