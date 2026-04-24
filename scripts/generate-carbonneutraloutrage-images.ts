/**
 * Generate all Campaign for Sustainable Overreactions images.
 *
 * Usage:  npx tsx scripts/generate-carbonneutraloutrage-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/carbonneutraloutrage/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/carbonneutraloutrage")
const PROGRAMS_DIR = path.join(OUT_DIR, "programs")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(PROGRAMS_DIR, { recursive: true })
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
  const mimeTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }
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
    size,
    quality: "high",
  } as any)
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

// ---------------------------------------------------------------------------
// Style anchors
// ---------------------------------------------------------------------------

const NGO_STYLE = "Modern NGO photography, warm natural lighting, soft cinematic depth of field, recycled-paper cream and sage green color palette with terracotta accents, photorealistic, magazine-quality, considered composition."

const ANGRY_LEADER_STYLE = `${NGO_STYLE} Subject's facial expression: visibly furious — clenched jaw, narrowed eyes, brows tightly furrowed, mouth tight. Composition is otherwise standard executive portrait: shallow depth of field, out-of-focus bookshelf or leafy plant background, earnest mid-career nonprofit director wardrobe (fleece vest over flannel, or linen blazer over a henley, in sage/terracotta/oatmeal tones).`

// ---------------------------------------------------------------------------
// Page heroes
// ---------------------------------------------------------------------------

async function pageHeroes() {
  console.log("\n— Page heroes —")
  await generateImage(
    "hero.png",
    `${NGO_STYLE} Wide composite hero scene: a calm group of diverse adults in earth-toned outdoor gear standing in front of a wind turbine at golden hour, several holding bamboo-handled pitchforks at rest. The mood is purposeful but composed — civic engagement rendered with the visual language of an environmental NGO annual report. Aspect ratio favors landscape framing.`,
    "1536x1024",
  )
  await generateImage("about.png", `${NGO_STYLE} Editorial photo of a small group portrait in a sunlit nonprofit office — diverse adults in earth-tone professional dress, framed prints of methodology diagrams behind them, the feeling of a founding-team archive image.`, "1536x1024")
  await generateImage("programs.png", `${NGO_STYLE} Overhead flatlay arrangement of program iconography: a bamboo pitchfork, a recycled cardboard box marked 'Carbon-Neutral Outrage Kit', a calculator, a small potted seedling, and a leather-bound credential folder — arranged on a recycled-paper backdrop.`, "1536x1024")
  await generateImage("impact.png", `${NGO_STYLE} Editorial photograph of a printed annual report cover lying open on a wooden table, with a steaming mug of tea beside it, soft afternoon light. The visible page shows abstract bar-chart graphics in evergreen and terracotta.`, "1536x1024")
  await generateImage("take-action.png", `${NGO_STYLE} A small orderly group of adults standing in a community garden holding signs (signs are out of focus / illegible), one person in mid-conversation with another, atmosphere is calm and organized rather than confrontational.`, "1536x1024")
  await generateImage("donate.png", `${NGO_STYLE} An open hardcover ledger book on a wooden desk with a Campaign-branded fountain pen resting beside it, sage-green bookmark ribbon, soft window light. Magazine-quality, intimate, signaling stewardship.`, "1536x1024")
  await generateImage("leadership.png", `${NGO_STYLE} A wide office hallway with framed black-and-white portraits of Campaign leaders along one wall, sage and terracotta accent on a feature wall, plants and natural light.`, "1536x1024")
  await generateImage("contact.png", `${NGO_STYLE} A vintage rotary telephone resting on a stack of recycled-paper folders, beside a small potted succulent, on a reclaimed-wood desk. Warm ambient lighting.`, "1536x1024")
}

// ---------------------------------------------------------------------------
// Program heroes
// ---------------------------------------------------------------------------

async function programHeroes() {
  console.log("\n— Program heroes —")
  await generateImage("outrage-kits.png", `${NGO_STYLE} Studio photo of a recycled cardboard kit box (open), contents arranged neatly: soy-ink slogan stencils, foam fingers in muted terracotta, a small protest sign on a bamboo dowel, a paper offset certificate. Top-down composition on cream linen.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("reusable-pitchforks.png", `${NGO_STYLE} Beautifully crafted bamboo-handled pitchfork lying on a workbench beside a sharpening stone, tine cap visible, soft natural light. Patagonia-magazine style still life.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("outrage-of-the-month.png", `${NGO_STYLE} A subscription box on a kitchen table with brown kraft packaging and a Campaign logo seal, accompanied by an opened printed bulletin in evergreen and terracotta typography. Morning light.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("outrage-offsets.png", `${NGO_STYLE} A printed Verified Outrage Offsets™ certificate framed on a wooden desk, alongside a fountain pen and a half-drunk mug of tea. The certificate's seal is visible but illegible.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("tantrum-footprint.png", `${NGO_STYLE} A laptop on a desk displaying an abstract calculator interface with simple sliders and bar-graph output in evergreen and terracotta — UI is suggestive rather than legible. Plant in the background.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("reforestation-through-rage.png", `${NGO_STYLE} Aerial photograph of a freshly planted reforestation site: orderly rows of saplings in protective tubes across rolling green hills, late-afternoon light.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("composted-hot-takes.png", `${NGO_STYLE} A cor-ten steel municipal composting bin in a leafy community garden setting, subtle sage-green CSO logo on the side, dappled afternoon light, recycled-paper signage above.`, "1536x1024", PROGRAMS_DIR)
  await generateImage("certified-overreactor.png", `${NGO_STYLE} A leather-bound credential folder open on a desk showing a printed Certified Responsible Overreactor™ certificate, lapel pin, and wallet card. Refined still-life composition.`, "1536x1024", PROGRAMS_DIR)
}

// ---------------------------------------------------------------------------
// Leader portraits — all visibly angry, jim/Emmett the angriest
// ---------------------------------------------------------------------------

async function leaderPortraits() {
  console.log("\n— Leader portraits —")
  await generateImageWithPerson(
    "hollis-penderwick.png",
    `${ANGRY_LEADER_STYLE} Founder & Executive Director of an environmental nonprofit. Restrained anger — the kind of fury that smiles for the camera through gritted teeth. Composition: head-and-shoulders portrait, slight three-quarter angle, out-of-focus bookshelf background.`,
    "bill",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "ansel-drayton.png",
    `${ANGRY_LEADER_STYLE} Director of Research at a climate-adjacent NGO. Visible barely-controlled fury, brows knit, mouth tight. Composition: head-and-shoulders portrait against a softly-lit cream wall with framed methodology diagrams partially visible.`,
    "brandon",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "emmett-landry.png",
    `${ANGRY_LEADER_STYLE} Chief Impact Officer photographed in full red-faced rage — nostrils flared, mouth tight, eyes burning. The angriest possible expression, but composition is otherwise refined nonprofit-executive portraiture: shallow depth of field, out-of-focus plants behind. The contrast between rage and composition is the entire point.`,
    "jim",
    "1024x1024",
    LEADERS_DIR,
  )
  await generateImageWithPerson(
    "rory-kellner.png",
    `${ANGRY_LEADER_STYLE} Director of Donor Relations. Restrained, simmering fury behind a slightly-too-tight smile, eyes narrowed. Composition: head-and-shoulders against a softly-lit office background with a single visible plant and abstract evergreen artwork.`,
    "sean",
    "1024x1024",
    LEADERS_DIR,
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  await pageHeroes()
  await programHeroes()
  await leaderPortraits()
  console.log("\nAll images generated.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
