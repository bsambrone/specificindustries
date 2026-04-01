/**
 * Batch image generator for Stratify site.
 * Uses OpenAI image APIs via curl to generate executive portraits and favicon.
 *
 * Usage: OPENAI_API_KEY=... npx tsx scripts/generate-stratify-images.ts
 */

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const API_KEY = process.env.OPENAI_API_KEY
if (!API_KEY) {
  console.error("OPENAI_API_KEY not set")
  process.exit(1)
}

const OUTPUT_DIR = path.join(__dirname, "../public/sites/stratify")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

async function generateWithPerson(prompt: string, filename: string, person: string, size: string = "1024x1024") {
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
  const photos = fs.readdirSync(personDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }

  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    // Use single reference photo — gpt-image-1 edit only supports single image
    const photo = photos[0]
    const imageArgs = `-F "image=@${path.join(personDir, photo)}"`

    const cmd = `curl -s https://api.openai.com/v1/images/edits \
      -H "Authorization: Bearer ${API_KEY}" \
      -F model="gpt-image-1" \
      ${imageArgs} \
      -F prompt="${prompt.replace(/"/g, '\\"')}" \
      -F size="${size}"`

    const result = execSync(cmd, { maxBuffer: 50 * 1024 * 1024, timeout: 120000 }).toString()
    const json = JSON.parse(result)

    if (json.error) {
      console.error(`  ✗ ${filename}: ${json.error.message}`)
      return
    }

    const b64 = json.data?.[0]?.b64_json
    if (b64) {
      fs.writeFileSync(filepath, Buffer.from(b64, "base64"))
      console.log(`  ✓ ${filename}`)
    } else {
      console.error(`  ✗ ${filename}: no image data in response`)
    }
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

async function generateImage(prompt: string, filename: string, size: string = "1024x1024") {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }

  console.log(`  🎨 Generating ${filename}...`)
  try {
    const body = JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })

    const cmd = `curl -s https://api.openai.com/v1/images/generations \
      -H "Authorization: Bearer ${API_KEY}" \
      -H "Content-Type: application/json" \
      -d '${body.replace(/'/g, "'\\''")}'`

    const result = execSync(cmd, { maxBuffer: 50 * 1024 * 1024, timeout: 120000 }).toString()
    const json = JSON.parse(result)

    if (json.error) {
      console.error(`  ✗ ${filename}: ${json.error.message}`)
      return
    }

    const b64 = json.data?.[0]?.b64_json
    if (b64) {
      fs.writeFileSync(filepath, Buffer.from(b64, "base64"))
      console.log(`  ✓ ${filename}`)
    } else {
      console.error(`  ✗ ${filename}: no image data in response`)
    }
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  console.log("\n═══ Stratify — Image Generation ═══\n")

  // ── Executive Portraits (4) — gpt-image-1 via /images/edits with reference photos ──
  console.log("📸 Executive Portraits")

  await generateWithPerson(
    "Professional corporate headshot of a charismatic male executive in his 40s wearing a sharp navy suit with gold tie, confident smile, slight infomercial host energy, dramatic studio lighting against dark background, motivational speaker vibe. High-end business photography.",
    "exec-stratton.png", "bill", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot of an energetic male executive in his 30s wearing a fitted navy blazer with gold pocket square, enthusiastic expression, hype-man energy, studio lighting against dark background. High-end business photography.",
    "exec-worthington.png", "brandon", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot of a friendly regular-looking male in his 50s wearing a navy polo and gold lanyard, approachable everyman smile, studio lighting against dark background. High-end business photography.",
    "exec-leveraux.png", "jim", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot of a mysterious calm male executive in his 40s wearing all-black with subtle gold cufflinks, serene knowing expression, slightly ethereal quality, studio lighting against dark background. High-end business photography.",
    "exec-ascendant.png", "sean", "1024x1024"
  )
  await delay(2000)

  // ── Favicon — gpt-image-1.5 via /images/generations ──
  console.log("\n🎯 Favicon")
  await generateImage(
    "Simple minimalist logo icon on solid dark navy background (#060e1a). A single gold (#c9a227) upward-pointing chevron or arrow shape, geometric and clean. No text. Suitable as a 64x64 favicon. Flat design, no gradients.",
    "favicon.png", "1024x1024"
  )
  await delay(2000)

  // ── Event Photos (2) — gpt-image-1.5 via /images/generations ──
  console.log("\n📸 Event Photos")
  await generateWithPerson(
    "Professional event photography of this person as a confident motivational speaker on a large conference stage, wearing a sharp navy suit with gold tie, gesturing dramatically, speaking to a packed audience of 2000+ people in a hotel ballroom. Navy blue and gold stage lighting, large LED screen behind speaker showing abstract upward-pointing graphics. Corporate conference atmosphere, MLM keynote energy. Shot from the audience perspective showing both speaker and crowd. Photorealistic.",
    "event-keynote.png", "bill", "1536x1024"
  )
  await delay(2000)

  await generateImage(
    "Professional event photography of a corporate networking mixer in a hotel ballroom. Group of diverse professionals in business attire mingling, some holding drinks, animated conversation. Navy blue and gold decorations, string lights, cocktail tables. Several people wearing gold lanyards with badges. Warm friendly atmosphere with subtle corporate conference vibe. Photorealistic.",
    "event-mixer.png", "1536x1024"
  )

  console.log("\n✅ Done!\n")
}

main()
