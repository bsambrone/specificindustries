/**
 * Generate all Rocks images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-rocks-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/rocks/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

// Load .env manually (no dotenv dependency needed)
const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/rocks")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

mkdirSync(OUT_DIR, { recursive: true })

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
) {
  const outPath = path.join(OUT_DIR, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }

  console.log(`  GEN   ${filename} ...`)
  try {
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
  } catch (err: any) {
    console.error(`  FAIL  ${filename}: ${err.message}`)
  }
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }

  const photos = getPersonPhotos(person)
  console.log(`  GEN   ${filename} (person: ${person}, refs: ${photos.map((p) => path.basename(p)).join(", ")}) ...`)

  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  }
  try {
    const imageFiles = await Promise.all(
      photos.map((p) => {
        const ext = path.extname(p).toLowerCase()
        const mime = mimeTypes[ext] || "image/png"
        return toFile(readFileSync(p), path.basename(p), { type: mime })
      }),
    )
    const response = await openai.images.edit({
      model: "gpt-image-1" as any,
      image: imageFiles as any,
      prompt,
      size,
    })
    const b64 = (response as any).data?.[0]?.b64_json
    if (!b64) throw new Error(`No image data returned for ${filename}`)
    writeFileSync(outPath, Buffer.from(b64, "base64"))
    console.log(`  DONE  ${filename}`)
  } catch (err: any) {
    console.error(`  FAIL  ${filename}: ${err.message}`)
  }
}

// ---------------------------------------------------------------------------
// Image definitions
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n=== Rocks Image Generation ===\n")
  console.log(`Output: ${OUT_DIR}\n`)

  // ---- Product photos (amateur folding-table treatment) ----
  console.log("--- Product Photos ---")

  await generateImage(
    "product-one-rock.png",
    "Amateur e-commerce product photograph of a single irregular medium-sized rock — clearly dug out of a backyard, with dirt still clinging to its surface. The rock sits on a folding card table covered in a crumpled white paper towel. Harsh direct phone-flash lighting creates a hard shadow. A strip of brown shipping tape is visible at the edge of the frame. Off-white wall in the background. No stylization, no professional lighting — aggressively amateur product photography. The rock looks ordinary and uninteresting.",
    "1024x1024",
  )

  await generateImage(
    "product-two-rocks.png",
    "Amateur e-commerce product photograph of two irregular medium-sized rocks — clearly dug from a backyard, dirt still on them — placed side by side on a folding card table covered in a crumpled white paper towel. One rock slightly larger than the other. Harsh direct phone-flash lighting creating hard shadows. A corner of brown packing tape visible at the edge of the frame. Off-white wall background. Deliberately amateur look, like someone listing items on Craigslist.",
    "1024x1024",
  )

  await generateImage(
    "product-box-of-rocks.png",
    "Amateur product photograph of a plain unmarked brown cardboard shipping box, half-open, crudely sealed with wide strips of brown packing tape, containing approximately ten to twelve dirt-covered rocks of varying sizes dug from a backyard. The box sits on a folding card table covered in a crumpled paper towel. Harsh overhead phone-flash lighting. Off-white wall behind. The whole composition looks like an amateur eBay listing. Unstyled, unremarkable, clearly just rocks in a box.",
    "1024x1024",
  )

  // ---- Hero / stock finance ----
  console.log("--- Hero Images ---")

  await generateImage(
    "hero.png",
    "Cinematic Bloomberg Terminal-era finance photograph from 1987: a middle-aged man in a tailored grey suit with suspenders stands in front of a wall of CRT monitors displaying amber-on-black financial charts. One prominent monitor clearly shows the label 'ROCK INDEX' with a rising amber line chart. The man holds a single ordinary rock in his left hand at chest height, as if it were a precious commodity. Dramatic amber rim lighting on his face, dark background, heavy film grain, 35mm photojournalism aesthetic. Expression is serious and focused.",
    "1536x1024",
  )

  await generateImage(
    "about-hero.png",
    "Wide cinematic shot of a 1980s commodities trading floor: rows of CRT monitors showing amber-on-black ticker text and bar charts. In the foreground, a man in a rumpled white dress shirt and loosened tie holds up a single ordinary rock above his head triumphantly like a trophy. Other traders in the background are on landline phones and waving papers. Cluttered desks with ashtrays, coffee cups, and paperwork. Warm amber ambient lighting, heavy film grain, high contrast, authentic 1987 atmosphere.",
    "1536x1024",
  )

  // ---- Vault Tour ----
  console.log("--- Vault Tour ---")

  await generateImage(
    "vault-hero.png",
    "Cinematic photograph: a dimly lit suburban residential garage with a bare concrete floor and exposed wall studs. A single dramatic spotlight from above illuminates a wooden pallet stacked with approximately fifteen irregular dirt-covered rocks. A stenciled 'CLASS III' marking is visible on the concrete wall behind the pallet. A suburban garage door and a workbench with tools are visible in the shadowy background, undermining the 'secure vault' vibe. Heavy film grain, moody industrial lighting, clearly pretending to be a bullion vault while being obviously a garage.",
    "1536x1024",
  )

  await generateImage(
    "vault-pallet.png",
    "Close-up photograph of dirt-covered rocks stacked on a wooden shipping pallet, each individual rock has a small white rectangular sticker with a printed serial number and a small QR code. Overhead fluorescent warehouse lighting casts cool blue tint. Industrial gray concrete floor visible at the edges. The contrast between bureaucratic serial tagging and the crude nature of the rocks is the focus. Slight film grain.",
    "1024x1024",
  )

  await generateImage(
    "vault-security.png",
    "Photograph of a man in his forties wearing a royal blue polo shirt with a white embroidered 'SECURITY' patch on the chest, a lanyard with a laminated ID around his neck, holding a brown clipboard in front of him. He stands in front of a tall chain-link fence with a residential warehouse building visible behind. His expression is completely deadpan and serious, like he is guarding something important. Natural overcast daylight, shot on a 35mm camera with slight grain. Suburban setting obviously not a real bullion facility.",
    "1024x1024",
  )

  await generateImage(
    "vault-padlock.png",
    "Close-up dramatic photograph of a heavy black combination padlock hanging on a chain-link fence gate. Warehouse or garage interior visible through the chain-link, out of focus, with hints of pallets in the background. Moody side lighting casts hard shadows. Film grain, high contrast, black-and-amber tonal range. The padlock looks serious but the surroundings hint at something mundane.",
    "1024x1024",
  )

  await generateImage(
    "contact-office.png",
    "Photograph of a makeshift 'trading desk' setup that is clearly a cheap folding card table: three old beige CRT monitors displaying amber-on-black financial data, a beige rotary telephone, a stapler, a half-empty coffee mug, a yellow legal pad. The setting is a basement with a concrete floor, exposed ceiling pipes, and a single hanging bare-bulb light. The whole scene tries to look like a professional trading setup but is unmistakably amateur. Warm tungsten lighting, film grain, 1987 aesthetic.",
    "1024x1024",
  )

  // ---- Exec portraits (80s Wall Street traders) ----
  console.log("--- Exec Portraits ---")

  const execPrompt =
    "Portrait of this person styled as an 1980s Wall Street trader. They wear a rumpled white dress shirt with the sleeves rolled up, bright red suspenders over the shirt, a loosened necktie pulled askew, and slicked-back hair. They hold a lit cigar in one hand. The background is a dim bullpen trading floor with rows of amber-glowing CRT monitors out of focus behind them. Warm amber rim lighting, heavy film grain, authentic 1987 finance aesthetic. Serious, confident expression. Photorealistic portrait."

  await generateImageWithPerson("team-bill.png", execPrompt, "bill")
  await generateImageWithPerson("team-brandon.png", execPrompt, "brandon")
  await generateImageWithPerson("team-jim.png", execPrompt, "jim")
  await generateImageWithPerson("team-sean.png", execPrompt, "sean")

  // ---- Favicon ----
  console.log("--- Favicon ---")

  await generateImage(
    "favicon.png",
    "Minimal icon design: a solid pure amber (#ff9900) silhouette of a simple irregular rock shape, centered on a pure black (#0a0a0a) square background. Completely flat — no gradients, no shadows, no texture, no text. The rock silhouette is simple, rounded, readable at very small sizes. High contrast. Suitable as a browser favicon.",
    "1024x1024",
  )

  console.log("\n✓ Done.\n")
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
