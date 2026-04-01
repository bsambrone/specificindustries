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
  await delay(2000)

  // ── Hero Background — exec team celebrating ──
  console.log("\n🏠 Homepage Hero")
  await generateWithPerson(
    "Cinematic wide-angle photograph of this person as the central figure in a group of four male executives celebrating a business victory. They wear sharp navy suits with gold ties and pocket squares. The central figure is front and center with arms raised triumphantly. Confetti in gold and navy is falling. Dramatic stage lighting with gold spotlights. Dark navy background. The energy is pure MLM conference keynote finale — victorious, over-the-top, motivational speaker celebration. Photorealistic, high-end corporate event photography.",
    "hero-team.png", "bill", "1536x1024"
  )
  await delay(2000)

  // ── Homepage: Three Steps (3) ──
  console.log("\n📸 Homepage Step Images")
  await generateImage(
    "Photorealistic image of a person excitedly signing paperwork at a folding table in a hotel conference room. A branded starter kit box with gold and navy packaging sits on the table. An overly enthusiastic sponsor in a navy suit hovers behind them with both thumbs up and a huge grin. Fluorescent lighting, slightly sterile corporate setting. The energy is eager and slightly desperate. MLM enrollment vibes.",
    "step-join.png", "1024x1024"
  )
  await delay(2000)

  await generateImage(
    "Photorealistic image of a person in business casual clothing enthusiastically presenting products to a skeptical-looking friend in a suburban living room. Products are spread across a coffee table. The presenter is leaning forward with intense eye contact and animated hand gestures. The friend has their arms crossed and a forced polite smile. Classic MLM home party product demonstration. Warm living room lighting.",
    "step-distribute.png", "1024x1024"
  )
  await delay(2000)

  await generateImage(
    "Photorealistic image of a person in a navy suit standing on a small illuminated stage or podium being applauded by a crowd in a hotel ballroom. Gold spotlight on the person on stage. They are receiving a trophy or plaque. The audience is clapping enthusiastically. Banner behind reads congratulatory text. Classic MLM rank advancement ceremony energy. Corporate event photography.",
    "step-elevate.png", "1024x1024"
  )
  await delay(2000)

  // ── Opportunity: Yield Distribution (3) ──
  console.log("\n📸 Opportunity Yield Images")
  await generateImage(
    "Photorealistic close-up photograph of two pairs of hands exchanging a branded product box and cash money across a table. The product box has navy and gold branding. Crisp bills are being handed over. Shot from slightly above, shallow depth of field. Clean, well-lit, commercial product photography feel. Direct sales transaction energy.",
    "yield-primary.png", "1024x1024"
  )
  await delay(2000)

  await generateImage(
    "Photorealistic aerial/bird's-eye view illustration of a branching network tree of people in business attire, arranged in a pyramid-like hierarchy spreading outward and downward. Gold lines connect them showing flow of money upward through the layers. Top person is largest and glowing gold. Navy blue background with gold accent lighting. Corporate infographic meets MLM compensation plan diagram. Clean, modern, slightly ominous.",
    "yield-secondary.png", "1024x1024"
  )
  await delay(2000)

  await generateImage(
    "Photorealistic image of a person lounging in a hammock on a tropical beach with a laptop showing financial charts with lines going up. They are wearing sunglasses and a relaxed smile, dressed in smart casual with a gold watch. Phone nearby showing notification alerts of incoming payments. Crystal clear water and palm trees in background. The ultimate 'passive income while you sleep' MLM fantasy lifestyle photo. Aspirational, slightly too perfect.",
    "yield-tertiary.png", "1024x1024"
  )

  console.log("\n✅ Done!\n")
}

main()
