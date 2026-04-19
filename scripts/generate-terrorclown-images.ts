/**
 * Batch image generator for the Terrorclown site.
 * Generates hero, favicon, 20+ product shots, 4 leadership portraits,
 * and 3 facility shots.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-terrorclown-images.ts
 *
 * Images saved to public/sites/terrorclown/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/terrorclown/data/products"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/terrorclown")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "products"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leadership"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "facility"), { recursive: true })

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

// ─── Style constants ──────────────────────────────────
const CATALOG_STYLE =
  "Vintage 1950s American toy catalog photography: warm sepia-tinted studio shot on a cream paper backdrop (#F5EDE0), soft diffuse lighting from upper-left, subtle halftone paper grain texture, slightly faded print quality. Centered composition. No text in image. Faint warm vignette."

const CLOWN_DESCRIPTION =
  "A three-foot-tall vintage porcelain clown doll in an old-fashioned white ruffled collar and a muted deep-red and teal harlequin suit. Impossibly wide smile revealing FOUR ROWS of polished bone-white sharp teeth, each filed to a point. Large uncanny glass eyes catching the light. Stitched lips at the edges of the mouth. Soft weighted cloth body. Sits or stands passively. Sinister but restrained — not bloody, not cartoonish. Antique craftsmanship feel."

// ─── Hero + favicon ───────────────────────────────────
const TOP_LEVEL_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [
    `${CATALOG_STYLE} ${CLOWN_DESCRIPTION} The clown sits upright on a vintage child's wooden rocking chair, holding a single bright red helium balloon by a cotton string. Landscape composition, clown slightly left of center. Warm cream backdrop with subtle paper texture. The scene reads as "heirloom toy catalog front cover, circa 1955."`,
    "hero.png",
    "1536x1024",
  ],
  [
    `A simple geometric favicon icon: a stylized toothy clown smile — curved mouth shape in deep circus red (#A8352A) showing two rows of sharp white triangle teeth — on a warm cream (#F5EDE0) background. Bold, minimal, legible at 16-32px. No text. Centered.`,
    "favicon.png",
    "1024x1024",
  ],
]

// ─── Product prompts ──────────────────────────────────
function getProductPrompt(slug: string, name: string, tagline: string): string {
  const prompts: Record<string, string> = {
    "terror-clown": `${CATALOG_STYLE} ${CLOWN_DESCRIPTION} Full-length formal catalog portrait. Clown standing or seated, centered, viewed from the front. Single product shot on cream backdrop.`,
    "haunted-headboard-bed-twin": `${CATALOG_STYLE} A solid dark-stained Ohio white oak twin bed frame photographed in a quiet period-appropriate bedroom scene. The tall carved headboard is prominently centered, hand-etched with the inscription "CAN'T SLEEP, CLOWNS WILL EAT ME" in serifed carved letters. The bed is made with a white cotton coverlet. No clown in the frame. Quiet menace.`,
    "haunted-headboard-bed-full": `${CATALOG_STYLE} A solid dark-stained Ohio white oak full-size bed frame photographed in a period bedroom. Tall carved headboard hand-etched with "CAN'T SLEEP, CLOWNS WILL EAT ME". White coverlet. No clown in frame.`,
    "under-bed-lurker-kit": `${CATALOG_STYLE} Low-angle view of a vintage child's bedroom: a slatted wooden white-oak bedskirt runs under a simple wooden bed frame. Through the slats, peeking out from the darkness below, a wide sharp-toothed porcelain clown smile and one glass eye are just visible. Dust motes visible in the soft light. Uncanny, restrained.`,
    "closet-observation-post": `${CATALOG_STYLE} A period bedroom closet with a white louvered wardrobe door, slightly ajar. Through the horizontal louvers, two large glass eyes and part of a wide toothy smile are visible in the darkness inside. The rest of the clown is concealed.`,
    "sewer-grate-portal": `${CATALOG_STYLE} A cast-iron circular sewer grate insert installed in a weathered concrete floor. Through the grate bars, emerging from the darkness below, a white-gloved porcelain hand is reaching up. No clown face visible. The grate has authentic patina. Side-lit.`,
    "ceiling-wire-night-watcher": `${CATALOG_STYLE} A period children's bedroom ceiling, viewed from below. Mounted flush to the ceiling plaster, a three-foot porcelain clown face — four rows of sharp bone-white teeth, large glass eyes — is affixed face-down, gazing toward the camera. The ceiling plaster shows period water-stain texture. Soft window light from the side. No bed visible.`,
    "attic-whisper-setup": `${CATALOG_STYLE} An unfinished attic space with exposed wooden rafters. A vintage leather suitcase stands open near the rafters. Perched on the rafter above the suitcase, a porcelain clown in a harlequin suit sits in shadow, only the sharp toothy smile clearly lit. Dust and old-house atmosphere.`,
    "basement-boiler-companion": `${CATALOG_STYLE} A mid-century basement with a copper steam pipe prop and a small flickering pilot-light flame in a cast-iron housing. Standing beside the pipe, a porcelain clown with a wide sharp-toothed smile gazes directly at the camera. Warm amber pilot light illuminates one side of the clown's face.`,
    "gristle-set": `${CATALOG_STYLE} A close product photograph of a velvet-lined wooden presentation box displaying two rows of sharp, pointed, bone-white porcelain teeth laid out in order. Each tooth hand-polished. Studio product shot.`,
    "long-smile-upgrade": `${CATALOG_STYLE} A close product photograph of an extended porcelain smile module — two elongated strips of hand-polished teeth in matching porcelain, presented on cream fabric. Studio product shot.`,
    "red-balloon-bundle": `${CATALOG_STYLE} A cluster of twelve bright red vintage latex balloons tied with white cotton strings, floating against a cream backdrop. Catalog product shot.`,
    "voice-box-module": `${CATALOG_STYLE} A small mid-century electronic module with a circular speaker grille, a toggle switch, and an engraved brass label reading "PENNYWHISTLE VOICE". Amber bakelite casing. Catalog product photo.`,
    "blood-splatter-couture": `${CATALOG_STYLE} Three folded vintage clown outfits (ruffled collars and harlequin-patterned suits) displayed on a velvet mat. The fabric shows subtle aged staining in darker patches — tasteful, restrained, nothing explicit. Catalog product shot.`,
    "sewer-scent-diffuser": `${CATALOG_STYLE} A vintage plug-in aromatherapy unit, cream bakelite casing with a small brass Pennywhistle logo and two ventilation slots on top. Studio product shot on cream backdrop.`,
    "replacement-eye-set": `${CATALOG_STYLE} Three pairs of hand-blown glass eyes — clear, milky, and one with an optical sheen — nested in individual velvet-lined compartments of a small wooden presentation case. Close product photo.`,
    "pocket-terror-clown": `${CATALOG_STYLE} An eight-inch miniature version of Terror Clown — same porcelain face, same four rows of sharp teeth, same harlequin suit — standing beside a period travel case. Smaller scale shown relative to the case.`,
    "floating-edition-upgrade": `${CATALOG_STYLE} A mid-century product kit: a sealed plastic-wrapped buoyancy modification package with a cream label reading "THE FLOATING EDITION". Beside it, a schematic diagram of the floating clown upright in water. Catalog product shot.`,
    "starter-kit": `${CATALOG_STYLE} A flatlay product grouping: a porcelain Terror Clown on its side, a small Experience kit box, and a red balloon bundle, arranged on a cream backdrop. Catalog flatlay.`,
    "family-pack": `${CATALOG_STYLE} A flatlay of three porcelain clowns of descending size (small, medium, full), one Experience box, and one accessory box, arranged on a cream backdrop. Group catalog shot.`,
    "deluxe-home-installation": `${CATALOG_STYLE} A room-setting photograph: the Haunted Headboard Bed in a period bedroom, with a Sewer-Scent Diffuser plugged in on the bedside table, and two labeled Experience kit boxes stacked nearby. No clown in frame. Full room catalog shot.`,
  }
  return prompts[slug] || `${CATALOG_STYLE} Product catalog photograph of "${name}". ${tagline}`
}

// ─── Leadership portraits ─────────────────────────────
const PORTRAIT_STYLE =
  "Sepia-toned formal 1950s American studio portrait photograph. The subject wears a period-appropriate dark wool suit with wide lapels, white dress shirt, and a narrow tie. Soft studio lighting from three-quarters, a painted-canvas backdrop in muted gray-brown. Slightly aged print quality, subtle paper grain. Dignified, restrained expression. The subject looks slightly to their right, not directly at the camera. Framed head and upper chest."

const LEADERSHIP: Array<[string, string, string]> = [
  ["bill", "leadership/whistlethwaite.png", `${PORTRAIT_STYLE} The subject is an older American man in his sixties with grey hair, serving as the elder founder of a family-owned toy company. Kindly but serious expression.`],
  ["brandon", "leadership/hollingsworth.png", `${PORTRAIT_STYLE} The subject is an American man in his mid-forties, clean-cut, well-groomed. Attentive, studious expression. Holds a fountain pen in one hand just visible at frame edge.`],
  ["jim", "leadership/crane.png", `${PORTRAIT_STYLE} The subject is an American man in his fifties, with an intense creative expression and slightly wild hair. A small Pennywhistle lapel pin on his jacket.`],
  ["sean", "leadership/pennywhistle.png", `${PORTRAIT_STYLE} The subject is an American man in his forties, gaunt, reserved, unsmiling. Slightly shadowed side of the face. His expression is neutral to sorrowful.`],
]

// ─── Facility shots ───────────────────────────────────
const FACILITY: Array<[string, string]> = [
  [
    "facility/exterior.png",
    `${CATALOG_STYLE} Exterior photograph of a 1940s brick industrial building in small-town Millbrook, Ohio. A hand-painted wooden sign reads "THE PENNYWHISTLE PLAY CO. — EST. 1948" over the main entrance. Vintage automobiles parked out front. Autumn afternoon light. Faded print quality.`,
  ],
  [
    "facility/kiln-room.png",
    `${CATALOG_STYLE} Interior photograph of a period porcelain kiln workshop. A single large brick-lined kiln is centered. Wooden racks hold rows of unfinished white porcelain clown-face masks (no painted features, no teeth), awaiting firing. Soft window light. Industrial 1950s craft atmosphere.`,
  ],
  [
    "facility/enamel-workshop.png",
    `${CATALOG_STYLE} Interior photograph of an enamel-finishing workshop. Long wooden workbenches. Rows of hand-polished white porcelain clown heads, teeth being hand-set by craftsmen using small precision tools. Soft natural light from high windows. Restrained, not horror — "artisan workshop" feeling.`,
  ],
]

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  console.log("🎪 Generating Terrorclown imagery...\n")

  console.log("─── Hero + favicon ─────────────────────")
  for (const [prompt, filename, size] of TOP_LEVEL_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(500)
  }

  console.log("\n─── Products ───────────────────────────")
  for (const p of products) {
    // Extract just the filename portion from image path (strip /sites/terrorclown/)
    const filename = p.image.replace("/sites/terrorclown/", "")
    await generateImage(getProductPrompt(p.slug, p.name, p.tagline), filename, "1024x1024")
    await delay(500)
  }

  console.log("\n─── Leadership portraits ──────────────")
  for (const [person, filename, prompt] of LEADERSHIP) {
    await generateWithPerson(prompt, filename, person, "1024x1024")
    await delay(500)
  }

  console.log("\n─── Facility shots ────────────────────")
  for (const [filename, prompt] of FACILITY) {
    await generateImage(prompt, filename, "1024x1024")
    await delay(500)
  }

  console.log("\n✓ Complete.")
}

main()
