/**
 * Generates 10 new "ashamed / mortified" testimonial portraits for the shared
 * library at public/shared/testimonials/. These portraits are added to
 * src/data/testimonial-portraits.ts as part of the Seel-Tite implementation
 * but are available to any future Specific Industries site.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-seeltite-portraits.ts
 *
 * Existing files are skipped (resumable).
 */

import OpenAI from "openai"
import fs from "fs"
import path from "path"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/shared/testimonials")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const BASE_STYLE =
  "studio headshot portrait, neutral medium-gray backdrop, soft diffuse lighting, tasteful and SFW, photorealistic, subject looking slightly off-camera with eyes distant and unfocused, very slight sweat at the hairline, jaw tense, composed but visibly mortified — the look of someone who knows their Seel-Tite G1 has just engaged"

const PORTRAITS: Array<[string, string]> = [
  ["caldwell-briggs.png",      `${BASE_STYLE}. Subject: rugged construction foreman, 50s, graying beard, weathered face, wearing a high-visibility safety-orange vest over a charcoal t-shirt`],
  ["elise-tanaka.png",         `${BASE_STYLE}. Subject: corporate CFO in her 40s, East Asian, sharp navy blazer, minimal jewelry, neatly styled black hair`],
  ["rev-thomasina-oakes.png",  `${BASE_STYLE}. Subject: Protestant wedding officiant, woman in her 60s, silver hair, white clerical collar under a black robe, kindly but strained expression`],
  ["capt-rourke-vallis.png",   `${BASE_STYLE}. Subject: commercial airline pilot, man in his 50s, four-stripe navy captain's uniform, peaked cap visible, slight flush at the collar`],
  ["dr-moira-petrescu.png",    `${BASE_STYLE}. Subject: cardiothoracic surgeon, woman in her 40s, navy scrub top, surgical cap pushed back from forehead, visible exhaustion`],
  ["linda-morrissey.png",      `${BASE_STYLE}. Subject: PTA board chair, woman in her 50s, warm cardigan over a pastel blouse, subtle pearl earrings`],
  ["coach-derrick-plum.png",   `${BASE_STYLE}. Subject: high school football coach, man in his 40s, whistle visible on a lanyard, Seel-Tite-free charcoal polo`],
  ["tamsin-kerrigan.png",      `${BASE_STYLE}. Subject: deposed witness, woman in her 30s, dark blouse suitable for testimony, minimal makeup, hair pulled back`],
  ["judson-hale.png",          `${BASE_STYLE}. Subject: touring stand-up comic, man in his 30s, simple dark t-shirt, slight stubble, stage-makeup faintly visible`],
  ["margaux-sanderling.png",   `${BASE_STYLE}. Subject: local news meteorologist, woman in her 40s, teleprompter-ready makeup, silk blouse in a TV-friendly color`],
]

async function generatePortrait(filename: string, prompt: string) {
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
      size: "1024x1024",
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

async function main() {
  console.log("\n📸 Shared Library — 10 Ashamed Portraits\n")
  for (const [filename, prompt] of PORTRAITS) {
    await generatePortrait(filename, prompt)
    await new Promise((r) => setTimeout(r, 2500))
  }
  console.log("\n✓ Done. Portraits saved to public/shared/testimonials/\n")
}

main()
