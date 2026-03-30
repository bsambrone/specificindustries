/**
 * Generate executive portraits using reference photos.
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-exec-portraits.ts
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/strategicvoid")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function generatePortrait(prompt: string, filename: string, person: string) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }

  const personDir = path.join(BASE_IMAGES_DIR, person)
  const photos = fs.readdirSync(personDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f)).slice(0, 2)

  console.log(`  🎨 Generating ${filename} (with ${person}: ${photos.join(", ")})...`)

  try {
    // Convert to File objects with explicit mime types
    const imageFiles = await Promise.all(
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
      image: imageFiles as any,
      prompt,
      size: "1024x1024",
      quality: "high",
    })

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
      console.log(`  ✓ ${filename}`)
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
      console.log(`  ✓ ${filename}`)
    }
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
    if (err.error) console.error(`    Detail: ${JSON.stringify(err.error)}`)
  }
}

async function main() {
  console.log("\n📸 Generating Executive Portraits\n")

  await generatePortrait(
    "Professional corporate headshot portrait of this person as an executive. Dark navy suit, gold tie. Serious, authoritative expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-thornbury.png", "bill"
  )
  await delay(3000)

  await generatePortrait(
    "Professional corporate headshot portrait of this person as an executive. Charcoal suit, confident expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-hawthorne-clyde.png", "brandon"
  )
  await delay(3000)

  await generatePortrait(
    "Professional corporate headshot portrait of this person as an executive. Navy blazer, energetic expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-pennington.png", "jim"
  )
  await delay(3000)

  await generatePortrait(
    "Professional corporate headshot portrait of this person as an executive. Dark suit, measured and composed expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-ashford-wexley.png", "sean"
  )

  console.log("\n✓ Done\n")
}

main().catch(console.error)
