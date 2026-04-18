/**
 * Batch image generator for Privatrix.
 *
 * Usage: set -a; source .env; set +a; npx tsx scripts/generate-privatrix-images.ts
 *
 * Outputs to public/sites/privatrix/{hero,favicon,leadership,products}/...
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/privatrix/data/products"
import { founders } from "../src/sites/privatrix/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/privatrix")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leadership"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "products"), { recursive: true })

async function generateImage(prompt: string, filename: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
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

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

async function generateWithPerson(prompt: string, filename: string, person: string, size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024") {
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
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })

    const imageData = response.data[0]
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

const HERO_PROMPT =
  "Wide cinematic enterprise SaaS marketing visual: a sleek, modern corporate headquarters lobby in deep navy and gold, polished glass walls etched with a subtle dot/mesh security pattern, soft glowing geometric privacy badges floating like holograms above a central desk, soft volumetric blue lighting, clean minimalist composition, photorealistic, high-end corporate brand photography style. Palette: deep navy, white, gold accents. No text. No people. No logos."

const FAVICON_PROMPT =
  "A minimalist gold capital letter 'P' inside a clean shield silhouette, centered on a deep navy circular background. Flat design, geometric, high contrast, suitable for use as a 64x64 favicon. No text other than the P. Sharp edges, modern enterprise aesthetic."

const LEADERSHIP_PROMPTS: Record<"bill" | "brandon" | "jim" | "sean", string> = {
  bill:
    "Professional corporate headshot of a confident senior executive man in his late 50s with grey hair, wearing a crisp navy blazer over a white open-collar shirt, soft studio lighting, navy gradient backdrop, slight half-smile, looking directly at camera. Photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  brandon:
    "Professional corporate headshot of a polished executive man in his late 30s, business-casual navy quarter-zip pullover, soft studio lighting, navy gradient backdrop, polite half-smile, arms slightly crossed, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  jim:
    "Professional corporate headshot of a distinguished executive man in his 50s wearing rimless glasses, charcoal blazer over light-blue button-down, soft studio lighting, navy gradient backdrop, neutral confident expression, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
  sean:
    "Professional corporate headshot of a composed executive man in his 40s, navy blazer over a charcoal turtleneck, soft studio lighting, navy gradient backdrop, gentle smile, hand resting under chin, photorealistic LinkedIn-style enterprise SaaS executive portrait.",
}

const PRODUCT_PREAMBLE =
  "Studio product photography on a soft white seamless background with subtle navy gradient floor shadow, slight gold accent lighting, photorealistic, premium SaaS marketing aesthetic. Centered composition. No text on the product itself. "

const PRODUCT_SUFFIXES: Record<string, string> = {
  "encrypted-thoughts": "A polished brass paperweight engraved with a stylized brain icon and a wax-sealed leather-bound certificate folder embossed with a gold 'P' shield, sitting beside a navy fountain pen.",
  "privacy-curtain": "A thin, perfectly transparent rectangular phone screen overlay film floating above a smartphone-shaped silhouette, packaged in a navy satin pouch with a gold drawstring.",
  "padlock-icon": "A 3D-rendered shiny gold padlock icon hovering above a navy pedestal, cast in soft studio light, with subtle particle reflections.",
  "airgap-as-a-service": "A sleek modern server rack module with a glowing navy LED bar across its front and a small gold 'AIRGAP' nameplate, isolated on white.",
  "quantum-voicemail": "A retro-futuristic navy desk telephone handset with iridescent gold accents and a subtle glowing quantum-wave halo around the receiver, floating slightly above its cradle.",
  "consent-checkbox-simulator": "A large oversized chrome browser checkbox in mid-animation: half-checked with a glowing gold checkmark, suspended above a navy pedestal.",
  "cookie-banner-pro": "A long scroll of paper printed with a stylized cookie banner mockup, draping off the edge of a navy desk, with a tiny chocolate-chip cookie sitting on top of it.",
  "permission-dial": "An ornate brass control dial with hundreds of tiny labeled tick marks and a single navy indicator pointing straight up, mounted on a polished wood base.",
  "preference-center": "A stack of fourteen translucent navy tabbed dividers fanned out on a clean white surface, each printed with a small gold 'π' symbol.",
  "gdpr-adjacent-pack": "A laminated navy folder with embossed gold 'GDPR-Adjacent' lettering on the cover, slightly open to reveal crisp white interior pages.",
  "soc-pi-cert": "A polished gold medallion with the letters 'SOC-π' embossed at center, hung from a navy ribbon, lying flat on a white surface.",
  "hipaa-stickers": "A sheet of die-cut navy and gold compliance stickers featuring small shield, cross, and lock icons, photographed straight-on.",
  "compliance-calendar": "A modern wall calendar opened to a single month, navy header band with gold accents, hung against a clean white wall.",
  "trust-center-generator": "A holographic 3D wall of glowing badge icons in navy and gold, arranged in a 7x7 grid, photographed slightly off-axis with depth-of-field falloff.",
  "right-to-be-forgotten-form": "A minimalist single-field web form rendered as a glowing UI mockup floating above a navy pedestal, with a single text input and a 'Submit' button in gold.",
  "data-shredder-cloud": "A polished navy industrial shredder unit with subtle gold trim and a small gold 'CLOUD EDITION' nameplate, isolated on white.",
  "forgetting-stone": "A smooth, polished oval river rock in deep grey-blue, sitting on a hand-stitched navy velvet pouch with a gold drawstring, on a clean white surface.",
  "incognito-plus": "A laptop screen viewed straight-on, displaying an empty browser window with a vibrant blue-violet glowing border emanating outward, photorealistic.",
  "anonymous-analytics": "A sleek modern analytics dashboard mockup floating above a navy pedestal, with bar charts and a small label reading 'anonymousId' in gold subtle text.",
  "vpn-adjacent": "A stylized world map illustration with seventeen glowing connection lines all converging on a single point labeled 'NJ', rendered in navy and gold on a soft white background.",
}

async function main() {
  console.log("\n═══ Privatrix — Image Generation ═══\n")

  console.log("🏛  Hero")
  await generateImage(HERO_PROMPT, "hero.png", "1536x1024")
  await delay(2000)

  console.log("\n🛡  Favicon")
  await generateImage(FAVICON_PROMPT, "favicon.png", "1024x1024")
  await delay(2000)

  console.log("\n📸 Leadership Portraits")
  for (const founder of founders) {
    const prompt = LEADERSHIP_PROMPTS[founder.baseImage]
    const filename = `leadership/${path.basename(founder.portrait)}`
    await generateWithPerson(prompt, filename, founder.baseImage)
    await delay(2000)
  }

  console.log("\n📦 Product Images")
  for (const product of products) {
    const suffix = PRODUCT_SUFFIXES[product.slug]
    if (!suffix) {
      console.error(`  ✗ ${product.slug}: no prompt defined`)
      continue
    }
    const prompt = PRODUCT_PREAMBLE + suffix
    const filename = `products/${path.basename(product.image)}`
    await generateImage(prompt, filename, "1024x1024")
    await delay(1500)
  }

  console.log("\n═══ Done ═══")
  console.log("Next: run `node scripts/resize-favicons.mjs` to compress the favicon to 64x64.\n")
}

main().catch(console.error)
