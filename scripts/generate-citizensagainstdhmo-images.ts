/**
 * Generate all Citizens Against DHMO images.
 *
 * Usage:  npx tsx scripts/generate-citizensagainstdhmo-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/citizensagainstdhmo/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/citizensagainstdhmo")
const THREATS_DIR = path.join(OUT_DIR, "threats")
const STORIES_DIR = path.join(OUT_DIR, "stories")
const SOURCES_DIR = path.join(OUT_DIR, "sources")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

;[OUT_DIR, THREATS_DIR, STORIES_DIR, SOURCES_DIR, LEADERS_DIR].forEach((d) =>
  mkdirSync(d, { recursive: true }),
)

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

async function main() {
  console.log("HERO")
  await generateImage(
    "hero.png",
    "Photorealistic editorial photograph: a concerned middle-aged person filling a clear glass at a modern kitchen sink. Soft natural window light, warm domestic kitchen environment. Subtle cool-blue tint. The water is glass-clear but framed with a faint chemical-laboratory overlay graphic — small chemistry diagrams, atomic structure annotations — composited softly across the upper third. The mood is editorial, deadpan-serious, like a long-form magazine investigation cover. Cinematic depth of field. No text.",
    "1536x1024",
  )

  console.log("LEADERS")
  const leaderPrompts: { filename: string; prompt: string; person: string }[] = [
    { filename: "callum-rutherford.png", person: "bill", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a navy blazer over an open-collar dress shirt. Soft photographic studio lighting, plain warm-grey background, slight smile, confident composure. Sharp focus on eyes. Editorial-corporate framing." },
    { filename: "lachlan-whitford.png", person: "sean", prompt: "Professional headshot in the style of an NGO research-leadership website. The man wears a charcoal blazer over a soft-grey button-down shirt. Soft photographic studio lighting, plain warm-grey background, calm and scientific composure. Sharp focus on eyes. Editorial-academic framing." },
    { filename: "darius-thornquist.png", person: "brandon", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a tailored grey blazer over a soft-blue chambray shirt. Soft photographic studio lighting, plain warm-grey background, friendly confident expression. Sharp focus on eyes. Editorial-corporate framing." },
    { filename: "everett-kingsford.png", person: "jim", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a soft heather-green sweater over a button-down shirt. Soft photographic studio lighting, plain warm-grey background, warm and approachable expression. Sharp focus on eyes. Editorial-nonprofit framing." },
  ]
  for (const { filename, prompt, person } of leaderPrompts) {
    await generateImageWithPerson(filename, prompt, person, "1024x1024", LEADERS_DIR)
  }

  console.log("THREATS")
  const threatPrompts: { filename: string; prompt: string }[] = [
    { filename: "dhmo-in-ai-data-centers.png", prompt: "Editorial photograph: a vast modern data-center hall at dusk, long perspective down rows of glowing server racks. Visible cooling pipes carrying clear liquid run along the ceiling. Soft cool-blue light from monitor LEDs reflects on polished concrete floor. Cinematic, deadpan-serious mood. No text." },
    { filename: "the-hidden-dhmo-pandemic.png", prompt: "Editorial illustration in photoreal style: an Antarctic ice core sample being held up to soft daylight in gloved hands, with subtle tinted overlays showing chemical-detection graphics. Cool-blue tones throughout. Documentary-investigative mood. No text." },
    { filename: "dhmo-in-processed-foods.png", prompt: "Editorial overhead photograph: a kitchen counter arranged with packaged grocery items — a bottle of cooking oil, a box of cereal, a plastic-wrapped loaf of bread, a can of soup. Bright clinical natural light. Subtle cool-blue tint. Investigative-magazine framing. No text." },
    { filename: "influencers-speak-out.png", prompt: "Editorial photograph: a wellness influencer's staged kitchen scene — a marble counter with a clear glass water bottle, a journal, a phone on a tripod, soft morning light through linen curtains. Warm but slightly clinical mood, with a subtle cool-blue undertone. No text." },
    { filename: "dhmo-in-public-schools.png", prompt: "Editorial photograph: an empty school hallway at midday, sunlight streaming through windows, a stainless-steel water fountain in the foreground. Lockers line the walls. Quiet, deadpan-serious mood. Soft cool-blue tint. No text." },
    { filename: "the-climate-connection.png", prompt: "Editorial photograph: a coastal community photographed from a low aerial angle showing flooded streets after a storm event, with overcast skies. Documentary-investigative mood, cinematic depth. Soft desaturated tones with a cool-blue cast. No text." },
    { filename: "dhmo-and-drowning.png", prompt: "Editorial photograph: a public swimming pool at golden hour, completely still water, no swimmers, lifeguard chair empty in the background. Quiet, almost ominous mood. Soft cool-blue cast across the entire image. Cinematic depth. No text." },
    { filename: "dhmo-in-tumors.png", prompt: "Editorial illustration in photoreal style: a microscope on a clean lab bench, soft window light, beside a manila folder labeled with placeholder shapes and a clipboard. Quiet investigative-laboratory mood. Cool-blue undertone. No text." },
    { filename: "the-acid-rain-component.png", prompt: "Editorial photograph: a weathered stone monument in a European public square, photographed in the rain, water beading and running down the stone. Quiet melancholy mood. Soft cool-blue tones throughout. Documentary cinematic framing. No text." },
    { filename: "infrastructure-erosion.png", prompt: "Editorial photograph: a cracked, weathered concrete bridge support photographed up close, with rust streaks and water seepage marks. Overcast natural light. Documentary investigative mood. Cool-blue undertone. No text." },
  ]
  for (const { filename, prompt } of threatPrompts) {
    await generateImage(filename, prompt, "1536x1024", THREATS_DIR)
  }

  console.log("STORIES")
  const storyPrompts: { filename: string; prompt: string; person: string | null }[] = [
    { filename: "marcus-okafor.png", person: null, prompt: "Editorial professional headshot of a 28-year-old Nigerian-American man with close-cropped hair, neatly trimmed beard, wearing a heather-grey crew-neck sweater. Soft window light, plain neutral grey background, thoughtful expression. Documentary editorial style. Sharp focus on eyes. Photorealistic." },
    { filename: "patricia-vandermeer.png", person: null, prompt: "Editorial professional portrait of a 43-year-old white woman with shoulder-length blonde hair, wearing a soft cream cardigan over a navy top. Warm soft window light, plain neutral grey background, warm composed expression. Sharp focus on eyes. Photorealistic." },
    { filename: "harold-mathieson.png", person: null, prompt: "Editorial professional portrait of a 71-year-old white man with thick silver hair and reading glasses pushed up on his head, wearing a soft denim shirt under a navy blazer. Soft window light, plain neutral grey background, kind direct expression. Sharp focus on eyes. Photorealistic." },
    { filename: "amelia-chen.png", person: null, prompt: "Editorial professional portrait of a 20-year-old Asian-American woman with long straight dark hair and round wire-frame glasses, wearing a soft sage-green sweatshirt. Soft window light, plain neutral grey background, alert curious expression. Sharp focus on eyes. Photorealistic." },
    { filename: "trent-castellanos.png", person: null, prompt: "Editorial professional portrait of a 34-year-old Latino man with carefully styled dark hair and a neatly trimmed beard, wearing a fitted black t-shirt. Soft window light, plain neutral grey background, confident polished expression. Sharp focus on eyes. Photorealistic." },
    { filename: "elaine-ferrante.png", person: null, prompt: "Editorial professional portrait of a 52-year-old Italian-American woman with shoulder-length wavy auburn hair, wearing a soft burgundy blouse and small earrings. Soft window light, plain neutral grey background, warm thoughtful expression. Sharp focus on eyes. Photorealistic." },
    { filename: "raymond-okereke.png", person: null, prompt: "Editorial professional portrait of a 47-year-old Black man with short hair and a salt-and-pepper beard, wearing a soft navy work shirt. Soft window light, plain neutral grey background, steady direct expression. Sharp focus on eyes. Photorealistic." },
    { filename: "jenna-novak.png", person: null, prompt: "Editorial professional portrait of a 29-year-old white woman with long dark hair and bangs, wearing a soft mustard-yellow turtleneck. Soft window light, plain neutral grey background, calm reflective expression. Sharp focus on eyes. Photorealistic." },
  ]
  for (const { filename, prompt, person } of storyPrompts) {
    if (person) {
      await generateImageWithPerson(filename, prompt, person, "1024x1024", STORIES_DIR)
    } else {
      await generateImage(filename, prompt, "1024x1024", STORIES_DIR)
    }
  }

  console.log("SOURCES")
  const sourcePrompts: { filename: string; prompt: string }[] = [
    { filename: "data-centers.png", prompt: "Editorial photograph: rows of server racks inside a hyperscale data center, large cooling pipes overhead carrying clear liquid, soft cool-blue ambient LED light reflected on polished concrete floor. Cinematic depth, documentary mood. No text." },
    { filename: "infant-formula.png", prompt: "Editorial overhead photograph: a clean kitchen counter with a feeding bottle, a small canister of formula powder (label not visible), a measuring scoop, and a clean cloth. Soft warm window light. Documentary-investigative mood with subtle cool-blue undertone. No text." },
    { filename: "public-schools.png", prompt: "Editorial photograph: a school cafeteria during a quiet moment, long lunch tables, clear plastic cups of water at each place setting, sunlight through high windows. Documentary mood, soft cool-blue cast. No text." },
    { filename: "hospital-ivs.png", prompt: "Editorial photograph: a hospital room IV stand with a clear bag of fluid, soft daylight from a window, a neatly made bed in the background, blurred medical equipment. Quiet documentary mood. Soft cool-blue tones. No text." },
    { filename: "organic-produce.png", prompt: "Editorial photograph: a farmer's-market table arranged with fresh leafy greens, tomatoes, and citrus, with a wooden crate and a chalkboard placeholder. Soft daylight, slightly desaturated colors with a cool-blue cast. Documentary mood. No text." },
    { filename: "gym-water-bottles.png", prompt: "Editorial photograph: a gym floor with a stainless-steel water bottle in the foreground next to a folded towel, weight rack and matte black machines blurred in the background. Soft cool-blue light. Documentary editorial mood. No text." },
    { filename: "weather-systems.png", prompt: "Editorial photograph: a heavy rainstorm photographed from inside a window, raindrops streaking down the glass, blurred urban street and umbrellas in the background. Cool-blue tones throughout, documentary mood. No text." },
    { filename: "the-human-bloodstream.png", prompt: "Editorial illustration in photoreal style: a sterile lab bench with a row of clear glass blood-sample vials in a rack, soft daylight, gloves and a clipboard nearby. Cool-blue undertone, investigative-clinical mood. No text." },
  ]
  for (const { filename, prompt } of sourcePrompts) {
    await generateImage(filename, prompt, "1536x1024", SOURCES_DIR)
  }

  console.log("FAVICON SOURCE")
  await generateImage(
    "favicon-source.png",
    "Minimalist square logo on a deep institutional blue background. Centered: a stylized hand-drawn water-droplet shape in cream/off-white, with a single thin diagonal slash across it. Clean, modern nonprofit/advocacy aesthetic. No text. Vector-clean look.",
    "1024x1024",
  )

  console.log("ALL DONE")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
