/**
 * Generate all Institute for Synergy & Pointless Metrics (ISPM) images.
 *
 * Usage:  npx tsx scripts/generate-pointlessmetrics-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/pointlessmetrics/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/pointlessmetrics")
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
// Hero prompts
// ---------------------------------------------------------------------------

const heroPrompts = [
  {
    filename: "hero.png",
    prompt: "A wide institutional research office photograph in warm natural light. Foreground: a large polished walnut desk covered in neatly arrayed brass research instruments, printed scatter plot charts with visible trend lines, an open hardcover academic almanac, a vintage brass desk lamp. Background: tall mahogany bookshelves filled with bound journals. A circular Institute seal is faintly visible embossed on a leather folio. Editorial colors: institutional navy, warm cream, slate sage, vermilion accents on the chart marks. Shallow depth of field. No text, no people, no logos. Printed-journal aesthetic. 16:9 composition with subject right of center.",
  },
  {
    filename: "about.png",
    prompt: "A quiet institutional office interior: floor-to-ceiling dark mahogany bookshelves filled with bound journals and hardcover academic volumes, a framed faintly-visible circular crest with Latin motto on the wall, warm cream and navy tones, shallow depth of field, morning light through tall windows, no people, no visible text. Editorial photograph, 4:3 composition.",
  },
  {
    filename: "methodology.png",
    prompt: "An overhead photograph of a research desk: a large scatter plot hand-drafted in ink with a visible linear trend line, a slide rule, a fountain pen, printed statistical tables, a brass magnifying glass, a small bronze circular stamp. Paper cream background, navy ink, vermilion accent dots. No text, no people. Editorial still-life aesthetic.",
  },
  {
    filename: "shop.png",
    prompt: "A curated institutional product display arrayed on a long cream paper surface: a titanium ring, a small brass needle-gauge desktop dashboard, an engraved bronze plaque, a glass tube barometer, a stack of hardcover books, a bronze lapel pin on a velvet card. Warm natural light, no text, no logos. Editorial product photograph, 16:9.",
  },
  {
    filename: "findings.png",
    prompt: "A wall of framed scatter plots of different sizes, all printed on cream paper with navy dots and vermilion trend lines, hung salon-style against a warm cream wall. No visible text other than the plot marks themselves. Editorial photograph, shallow depth of field.",
  },
  {
    filename: "leadership.png",
    prompt: "An institutional portrait gallery: cream wall with four classical oil-style portrait frames hung in a row, each frame containing a warm dark-lit academic portrait. No identifying detail. Warm lighting. 16:9 composition.",
  },
  {
    filename: "contact.png",
    prompt: "A wooden desk with an open brass correspondence tray containing printed observation forms, a bronze inkwell, a fountain pen, a stamped envelope. Warm institutional lighting, cream paper, shallow depth of field. No text, no people.",
  },
  {
    filename: "favicon-source.png",
    prompt: "A circular Institute seal: cream background, deep navy concentric rings with Latin-like text around the outer ring, a stylized sigma Σ in the center over small scatter dots, vermilion accent. High contrast, readable at very small size. Square composition, centered, clean edges, no photographic elements.",
  },
]

// ---------------------------------------------------------------------------
// Portrait prompts
// ---------------------------------------------------------------------------

const portraitPrompts = [
  {
    filename: "leaders/orrin-bletchley.png",
    person: "bill",
    prompt: "A formal seated portrait of a distinguished older man with the look of a former management consultant, wearing a dark charcoal suit with a subtle navy tie. Patrician gravity — a slight furrow, oil-portrait energy. Background: out-of-focus dense mahogany bookshelves with bound journals. Warm natural light, shallow depth of field, subtle vignette. Waist-up composition. Institutional portrait photograph aesthetic. No text, no visible branding.",
  },
  {
    filename: "leaders/percival-ashcombe.png",
    person: "brandon",
    prompt: "A portrait of an intense mid-career male researcher, slightly disheveled, one hand near chin in a thoughtful gesture, wild-eyed true-believer intensity. Wearing a tweed sport coat with elbow patches over an open-collar earth-tone shirt. Background: blurred bookshelves and a whiteboard with faint chart sketches. Warm natural light, shallow depth of field. Waist-up composition. Institutional portrait aesthetic. No text, no branding.",
  },
  {
    filename: "leaders/augustus-crane.png",
    person: "jim",
    prompt: "A portrait of a male academic consultant with cold judgmental affect — flat expression, thin slight smile, sharp gaze. Wearing a charcoal blazer over a black turtleneck. Background: blurred walnut paneling and a framed diploma. Warm natural light, shallow depth of field. Waist-up. Institutional portrait aesthetic. No text, no branding.",
  },
  {
    filename: "leaders/beaumont-kessler.png",
    person: "sean",
    prompt: "A portrait of a male academic dean with smug certainty — leaning back slightly, half-smile, certain of everything. Wearing an earth-tone sport coat over an open-collar linen shirt. Background: blurred oil-style portraits and a framed parchment on a cream wall. Warm natural light, shallow depth of field. Waist-up. Institutional portrait aesthetic. No text, no branding.",
  },
]

// ---------------------------------------------------------------------------
// Product prompts
// ---------------------------------------------------------------------------

const productPrompts = [
  {
    filename: "products/vibe-ring.png",
    prompt: "A single polished titanium finger ring with a rose-gold finish, resting on a cream velvet surface next to a handwritten calibration card marked 'ISPM Model 4A'. Soft warm directional light. Editorial product photograph, no text on ring itself, shallow depth of field. Square composition.",
  },
  {
    filename: "products/synergy-obelisk.png",
    prompt: "A vertical brass desktop instrument shaped like a small obelisk, with three analog needle gauges on its front face, each gauge labeled with a small engraved brass plate. Resting on a walnut desk next to a hardcover book. Warm institutional lighting, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/tarnishing-plaque.png",
    prompt: "A rectangular bronze plaque with an embossed circular Institute seal in the upper left and fine engraved lines for a nameplate below. The bronze shows authentic patina variation across its surface — some polished areas, some slightly tarnished. Resting on a cream paper background. Warm side lighting, shallow depth of field. Editorial still-life photograph. Square composition.",
  },
  {
    filename: "products/ambient-mood-barometer.png",
    prompt: "A tall glass tube filled with a gradient of colored fluid (translucent blue at bottom transitioning to warm amber at top), mounted on a polished brass base with a small engraved plate. On a cream paper surface. Warm directional lighting, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/quarterly-report.png",
    prompt: "A hardcover academic journal-style report standing upright on a cream paper surface, cover in deep institutional navy with a large circular cream-colored Institute seal embossed in the center and the title 'The Quarterly Synergy Density Report' in elegant serif letters. Warm directional light, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/correlation-almanac.png",
    prompt: "A thick hardcover book, roughly 600 pages, standing on a walnut desk. Cover in deep cream with 'THE CORRELATION ALMANAC' in serif letters and a small navy circular seal below. Side view showing dense pages. Warm directional light, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/kpi-vibe-audit.png",
    prompt: "A hardcover bound institutional audit report labeled 'KPI VIBE AUDIT' on a cream cover with a small circular navy seal, resting on a walnut desk next to a fountain pen and a wax-sealed envelope. Warm directional lighting, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/correlation-coaching.png",
    prompt: "A walnut desk scene: a leather portfolio open to show a handwritten engagement letter on cream paper, a fountain pen, a porcelain cup of tea, a small brass-framed scatter plot print. Warm directional light, shallow depth of field. Editorial product photograph. Square composition, no visible text large enough to read.",
  },
  {
    filename: "products/certified-practitioner.png",
    prompt: "A bronze-finish circular lapel pin with the Institute seal embossed on its face, resting on a folded diploma-style certificate on cream paper. Warm directional light catching the bronze finish, shallow depth of field. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/sticker-pack.png",
    prompt: "A flat-lay arrangement of twelve circular water-bottle stickers on a cream paper surface, each sticker bearing a QR-code-like square pattern in navy and a small circular seal. The stickers are slightly overlapping, editorial arrangement. Warm directional light. Product photograph. Square composition.",
  },
  {
    filename: "products/wall-plaque.png",
    prompt: "A rectangular bronze-finish wall plaque, about A4-sized, with engraved text fields visible (name, date, r-value) and a circular Institute seal in the upper right corner. Mounted against a cream-painted wall with a subtle shadow. Warm directional light. Editorial product photograph. Square composition.",
  },
  {
    filename: "products/pocket-ruler.png",
    prompt: "A polished brass pocket-sized ruler with non-linear tick marks labeled in tiny engraved letters, resting on a cream paper surface next to a small folded calibration card. Warm side lighting catches the brass. Shallow depth of field. Editorial still-life product photograph. Square composition.",
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n— Page heroes —")
  for (const { filename, prompt } of heroPrompts) {
    await generateImage(filename, prompt, "1024x1024", OUT_DIR)
  }

  console.log("\n— Leader portraits —")
  for (const { filename, person, prompt } of portraitPrompts) {
    await generatePortrait(filename, person, prompt)
  }

  console.log("\n— Product images —")
  for (const { filename, prompt } of productPrompts) {
    await generateImage(path.basename(filename), prompt, "1024x1024", PRODUCTS_DIR)
  }

  console.log("\nAll images generated.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
