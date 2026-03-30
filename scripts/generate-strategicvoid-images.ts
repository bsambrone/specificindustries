/**
 * Batch image generator for Strategic Void Consulting site.
 * Uses OpenAI's gpt-image-1 model to generate product, executive, and misc images.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-strategicvoid-images.ts
 *
 * Images are saved directly to public/sites/strategicvoid/
 */

import OpenAI from "openai"
import fs from "fs"
import path from "path"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/strategicvoid")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ─── Image Generation Helpers ─────────────────────────────────

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

  // Get reference photos for this person
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images for ${person}`)
    return
  }
  const photos = fs.readdirSync(personDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2) // Use up to 2 reference photos

  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }

  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    const inputImages = photos.map(photo => {
      const photoPath = path.join(personDir, photo)
      const data = fs.readFileSync(photoPath)
      const base64 = data.toString("base64")
      const ext = path.extname(photo).toLowerCase()
      const mime = ext === ".png" ? "image/png" : "image/jpeg"
      return `data:${mime};base64,${base64}`
    })

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

// Small delay to avoid rate limits
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

// ─── Image Definitions ────────────────────────────────────────

async function main() {
  console.log("\n═══ Strategic Void Consulting — Image Generation ═══\n")

  // ── 1. Executive Portraits (4) ──
  console.log("📸 Executive Portraits")
  await generateWithPerson(
    "Professional corporate headshot portrait of a male executive in his 50s-60s. Dark navy suit, gold tie. Serious, authoritative expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-thornbury.png", "bill", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot portrait of a male executive in his 30s-40s. Charcoal suit, confident smile. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-hawthorne-clyde.png", "brandon", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot portrait of a male executive in his 40s-50s. Navy blazer, energetic expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. Disruptive energy. High-end business photography style.",
    "exec-pennington.png", "jim", "1024x1024"
  )
  await delay(2000)

  await generateWithPerson(
    "Professional corporate headshot portrait of a male executive in his 30s-40s. Dark suit, measured and composed expression. Dark background with subtle warm lighting. Executive consulting firm aesthetic. High-end business photography style.",
    "exec-ashford-wexley.png", "sean", "1024x1024"
  )
  await delay(2000)

  // ── 2. Homepage Hero ──
  console.log("\n🏠 Homepage & Misc")
  await generateImage(
    "Dark, moody corporate photography. A long polished conference table in a dimly lit modern boardroom, shot from one end. Deep navy and gold tones. Glass walls reflecting city lights at dusk. No people. Premium enterprise consulting aesthetic. Cinematic lighting.",
    "hero.png", "1536x1024"
  )
  await delay(2000)

  // ── 3. Solution Hero Images (8) ──
  console.log("\n🎯 Solution Hero Images")
  const solutionImages: [string, string][] = [
    ["Abstract corporate photography. A webcam on a dark desk with soft blue LED light, empty office chair slightly angled. Dark navy background with gold accent lighting. Moody, cinematic. No text. Enterprise aesthetic.", "solution-meeting-optimization.png"],
    ["Abstract corporate photography. A digital dashboard showing colorful abstract charts and graphs on a large monitor, soft glow. Dark navy background with gold accent lighting. Moody, cinematic. No text.", "solution-kpi-alignment.png"],
    ["Abstract corporate photography. A polished mahogany desk with a nameplate holder (empty), a pen holder, and a closed laptop. Dark navy background with gold accent lighting. Moody, cinematic. No text. Middle management aesthetic.", "solution-middle-management.png"],
    ["Abstract corporate photography. A keyboard with keys slightly illuminated in green and gold light, soft bokeh background. Dark navy tones. Moody, cinematic. No text. Productivity aesthetic.", "solution-productivity-theater.png"],
    ["Abstract corporate photography. A stack of thick corporate policy binders on a dark desk, soft spotlight. Dark navy background with gold accent lighting. Moody, cinematic. No text. Compliance aesthetic.", "solution-compliance-policy.png"],
    ["Abstract corporate photography. An email inbox on screen with hundreds of unread messages, soft blue glow. Dark navy background with gold accent lighting. Moody, cinematic. No text.", "solution-communication-enhancement.png"],
    ["Abstract corporate photography. A golden coin balanced on its edge on a polished dark surface, reflecting ambient light. Dark navy background. Moody, cinematic. No text. Decision-making aesthetic.", "solution-decision-support.png"],
    ["Abstract corporate photography. A desk with a potted succulent, a stress ball, and a motivational poster partially visible. Dark navy background with gold accent lighting. Moody, cinematic. No text.", "solution-employee-experience.png"],
  ]

  for (const [prompt, filename] of solutionImages) {
    await generateImage(prompt, filename, "1536x1024")
    await delay(2000)
  }

  // ── 4. Product Images ──
  console.log("\n📦 Product Images — Meeting Optimization")
  const meetingProducts: [string, string][] = [
    ["Product photography of a sleek, matte black weighted brick-shaped device on a dark desk surface. Minimalist, premium design. Gold accent edges. Dark navy background. Enterprise product aesthetic. No text.", "product-meeting-brick.png"],
    ["Product photography of a small, elegant desk-mounted device with a subtle motorized arm and tiny camera. Matte black with gold accents. Dark navy background. Enterprise product aesthetic. No text.", "product-autonod-pro.png"],
    ["Product photography of a sleek black hardware dongle with a subtle pulsing amber LED indicator. USB-C connector visible. Dark navy background with gold accent lighting. Enterprise product aesthetic. No text.", "product-delaysync.png"],
    ["Product photography of a minimalist software interface on a tablet screen showing a packed calendar grid, all slots filled with color-coded meetings. Dark navy and gold color scheme. Enterprise product aesthetic. No text.", "product-calendar-inflator.png"],
  ]

  for (const [prompt, filename] of meetingProducts) {
    await generateImage(prompt, filename)
    await delay(2000)
  }

  // Read current product slugs from the products file to generate remaining images
  console.log("\n📦 Product Images — Remaining Suites")
  const remainingProducts: [string, string][] = [
    // KPI Alignment
    ["Product photography of a sleek digital dashboard on a monitor showing abstract colorful metrics and charts. Matte black monitor frame. Dark navy background with gold accents. Enterprise aesthetic. No text.", "product-metric-multiplier.png"],
    ["Product photography of a tablet showing beautiful abstract data visualizations with vibrant gradients. Dark navy background. Enterprise aesthetic. No text.", "product-dashboard-deepener.png"],
    ["Product photography of a minimalist software interface showing target icons with moving dotted lines. Dark background with gold accents. Enterprise aesthetic. No text.", "product-okr-obfuscator.png"],
    ["Product photography of a digital compass on a dark surface, its needle spinning. Gold and navy color scheme. Enterprise aesthetic. No text.", "product-benchmark-blurrer.png"],

    // Middle Management
    ["Product photography of a premium wireless earpiece with a subtle gold ring accent, on a dark surface. Enterprise aesthetic. No text.", "product-authority-amplifier.png"],
    ["Product photography of a leather-bound notebook with gold embossed text on the cover, slightly open. Dark navy background. Enterprise aesthetic. No text.", "product-delegation-deflector.png"],
    ["Product photography of an elegant organizational chart printed on premium card stock, arranged in layers on a dark desk. Gold and navy. Enterprise aesthetic. No text.", "product-hierarchy-harmonizer.png"],
    ["Product photography of a sleek chat interface on a screen showing corporate messages with subtle passive-aggressive tone indicators highlighted in amber. Dark background. Enterprise aesthetic. No text.", "product-accountability-absorber.png"],

    // Productivity Theater
    ["Product photography of a sleek wearable headband with embedded LED lights showing green glow, on a dark surface. Futuristic but corporate. Gold accents. Enterprise aesthetic. No text.", "product-busyness-broadcaster.png"],
    ["Product photography of a software interface showing an elaborate task board with hundreds of cards, all in different status columns. Dark navy theme. Enterprise aesthetic. No text.", "product-task-multiplier.png"],
    ["Product photography of a minimalist status dashboard showing multiple activity indicators all green. Sleek dark interface. Gold accents. Enterprise aesthetic. No text.", "product-status-updater-pro.png"],
    ["Product photography of a notification bell icon rendered as a physical golden desk ornament on a dark surface. Premium material, glowing slightly. Enterprise aesthetic. No text.", "product-urgency-fabricator.png"],

    // Compliance & Policy
    ["Product photography of a towering stack of thick policy documents on a dark desk, spotlight from above. Gold page edges. Dark navy background. Enterprise aesthetic. No text.", "product-policy-proliferator.png"],
    ["Product photography of a minimalist interface showing rows of green checkboxes rapidly being checked. Dark navy theme. Gold accent checkmarks. Enterprise aesthetic. No text.", "product-audit-trail-thickener.png"],
    ["Product photography of a sleek compliance dashboard showing all-green status indicators and certification badges. Dark background. Gold and green accents. Enterprise aesthetic. No text.", "product-compliance-theater-suite.png"],
    ["Product photography of an abstract network diagram showing arrows redistributing between department nodes, displayed on a dark monitor. Navy and gold. Enterprise aesthetic. No text.", "product-responsibility-redistributor.png"],

    // Communication Enhancement
    ["Product photography of a sleek translation device showing corporate jargon on its screen, transforming simple text into complex business language. Dark background. Gold accents. Enterprise aesthetic. No text.", "product-jargon-injector.png"],
    ["Product photography of an email interface showing a very long elaborate email composed from a short original message. Dark navy theme. Gold accents. Enterprise aesthetic. No text.", "product-email-elongator.png"],
    ["Product photography of a text editor showing sentences being rewritten from active to passive voice with subtle highlighting. Dark background. Gold accents. Enterprise aesthetic. No text.", "product-passive-voice-optimizer.png"],
    ["Product photography of a communication clarity meter showing the needle firmly in the 'strategically vague' zone. Elegant gauge design. Dark navy background. Gold accents. No text.", "product-ambiguity-amplifier.png"],

    // Decision Support
    ["Product photography of an elegant golden coin with corporate branding, standing on its edge on a polished dark surface. Premium materials. Dark navy background. Enterprise aesthetic. No text.", "product-consensus-diffuser.png"],
    ["Product photography of a elegant meeting agenda showing multiple sub-committees branching from each item. Printed on premium paper on dark desk. Gold and navy. Enterprise aesthetic. No text.", "product-committee-spawner.png"],
    ["Product photography of a stakeholder mapping interface on a screen showing an impossibly complex web of connected names. Dark background. Gold connection lines. Enterprise aesthetic. No text.", "product-stakeholder-multiplier.png"],
    ["Product photography of an hourglass with the sand barely moving, on a polished dark executive desk. Gold metal frame. Dark navy background. Enterprise aesthetic. No text.", "product-decision-deferral-engine.png"],

    // Employee Experience
    ["Product photography of a corporate party invitation displayed on a tablet screen with 'MANDATORY' watermark, confetti graphics. Dark navy background. Gold accents. Enterprise aesthetic. No text.", "product-engagement-simulator.png"],
    ["Product photography of a happiness dashboard showing upward-trending smiley face metrics on a dark-themed monitor. All indicators green. Gold accents. Enterprise aesthetic. No text.", "product-morale-measurer.png"],
    ["Product photography of a beautifully designed culture deck presentation on a laptop screen, showing abstract corporate values. Dark navy theme. Gold accents. Enterprise aesthetic. No text.", "product-culture-deck-generator.png"],
    ["Product photography of a survey interface showing multiple-choice questions about workplace satisfaction on a tablet. Dark navy theme. Gold accents. Enterprise aesthetic. No text.", "product-satisfaction-survey-suite.png"],
    ["Product photography of a premium ergonomic office chair with subtle sensor strips glowing amber along the backrest. Dark navy background. Gold accents. Enterprise aesthetic. No text.", "product-ergomax-compliance-chair.png"],
    ["Product photography of a sleek feedback terminal touchscreen showing 'Your feedback matters!' with a submit button. Dark navy background. Gold accents. Enterprise aesthetic. No text.", "product-anonymous-feedback-redirector.png"],
  ]

  for (const [prompt, filename] of remainingProducts) {
    await generateImage(prompt, filename)
    await delay(2000)
  }

  // ── 5. Favicon ──
  console.log("\n🔖 Favicon")
  await generateImage(
    "A minimalist logo mark. The letters 'SV' intertwined in a square frame. Gold (#c9a84c) on dark navy (#0a1628) background. Clean geometric design. Corporate consulting firm logo. No other text or decoration.",
    "favicon.png"
  )

  console.log("\n═══ Generation Complete ═══\n")

  // Report
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f !== "product-placeholder.png")
  console.log(`Generated ${files.length} images in ${OUTPUT_DIR}`)
}

main().catch(console.error)
